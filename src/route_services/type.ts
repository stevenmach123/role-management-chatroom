import { user_mode,t_role, properties } from '../model';

type endprams="getAll"|"putStudent"|"getStudent"|"getNStudent"|"postStudent"|"postStudentUp"|"deleteStudent"|"putOStudent" 
|"getAllTypes" |"postRegis"|"postTypes"|"deleteAllTypes"|"deleteUser"|"delete_indi_structure"|"deleteType"
type auth1 = {this_user:user_mode ,exist:boolean}
type res1 = {message:string,student:user_mode,allstudent:user_mode[]}




export type {endprams,res1,auth1}
