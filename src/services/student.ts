import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, getDocs, setDoc } from "firebase/firestore";

export class StudentService {
 static async getProfile(studentId: string) {
 try {
 const docRef = doc(db, "students", studentId);
 const docSnap = await getDoc(docRef);
 
 if (docSnap.exists()) {
 const data = docSnap.data();
 return {
 id: data.uid,
 name: data.fullName || "Student",
 university: data.institution || "Pending Setup",
 major: data.degree || "Pending Setup",
 graduationYear: data.graduationYear || new Date().getFullYear().toString(),
 avatar: `https://i.pravatar.cc/150?u=${data.uid}`,
 trustScore: 0, // Calculated dynamically elsewhere
 skills: data.skills || [],
 isDigiLockerConnected: data.isDigiLockerConnected || false,
 profileCompletion: data.profileCompletion || 20,
 };
 }
 return null;
 } catch (error) {
 console.error("Error fetching student profile:", error);
 return null;
 }
 }

 static async getAcademicRecords(studentId: string) {
 try {
 const q = query(collection(db, "academic_records"), where("studentId", "==", studentId));
 const querySnapshot = await getDocs(q);
 
 const records: any[] = [];
 querySnapshot.forEach((doc) => {
 records.push({ id: doc.id, ...doc.data() });
 });
 return records;
 } catch (error) {
 console.error("Error fetching academic records:", error);
 return [];
 }
 }

 static async connectDigiLocker(studentId: string) {
 try {
    // Create CBSE Class 10 Record
    await setDoc(doc(db, "academic_records", `${studentId}_cbse10`), {
      studentId,
      type: "Class 10 Marksheet",
      board: "CBSE",
      percentage: "96.4%",
      year: "2020",
      score: "96.4%", // For UI compatibility
      verified: true,
      verifiedBy: "DigiLocker",
      source: "DigiLocker"
    });

    // Create CBSE Class 12 Record
    await setDoc(doc(db, "academic_records", `${studentId}_cbse12`), {
      studentId,
      type: "Class 12 Marksheet",
      board: "CBSE",
      percentage: "95.8%",
      year: "2022",
      score: "95.8%", // For UI compatibility
      verified: true,
      verifiedBy: "DigiLocker",
      source: "DigiLocker"
    });

    // Create Transfer Certificate
    await setDoc(doc(db, "academic_records", `${studentId}_transfer`), {
      studentId,
      type: "Transfer Certificate",
      board: "Delhi Public School",
      percentage: "N/A",
      year: "2022",
      score: "N/A", // For UI compatibility
      verified: true,
      verifiedBy: "DigiLocker",
      source: "DigiLocker"
    });

 // Update student profile to mark DigiLocker connected
 await setDoc(doc(db, "students", studentId), {
 isDigiLockerConnected: true,
 profileCompletion: 40 // Increase profile completion
 }, { merge: true });

 return { success: true };
 } catch (error) {
 console.error("Error simulating DigiLocker connection:", error);
 return { success: false, error };
 }
 }
}
