import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TddataService {

  todos: {"id":number,"task":string,"status":boolean}[] = [];
  api_url = "http://localhost:3000";
  error_msg:any;
  constructor(private http:HttpClient){
    this.todos =[{"id":1,"task":"do workout","status":true},
        {"id":2,"task":"football","status":true},
        {"id":3,"task":"draw","status":false},
    ];
  }

  // constructor() {
  //   this.todos= [
  //     {"id":1,"task":"do workout","status":true},
  //     {"id":2,"task":"football","status":true},
  //     {"id":3,"task":"draw","status":false},
  //     {"id":4,"task":"write","status":true},
  //   ];
  //  }

  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  }

  //Fetching data from REST API | HTTP GET
  getTodoList(): Observable<any> {
    return this.http.get<any>(this.api_url + '/todolist/').pipe(retry(1), catchError(this.error_msg))
  }

  //Adding new record using REST API | HTTP POST
  addNewTaskAPI(newTask: any):Observable<any> {
    return this.http.post<any>(this.api_url + '/todolist/',JSON.stringify(newTask),this.httpOptions).pipe(retry(1), catchError(this.error_msg));
  }

  //Updating record using REST API | HTTP PUT
  updateTaskAPI(updateTask: any,id:any):Observable<any> {
    return this.http.put<any>(this.api_url + '/todolist/' + id,JSON.stringify(updateTask),this.httpOptions).pipe(retry(1), catchError(this.error_msg));
  }

  //Delete record using REST API | HTTP DELETE
  deleteTaskAPI(id: any){
    return this.http.delete<any>(this.api_url + '/todolist/' + id,this.httpOptions).pipe(retry(1), catchError(this.error_msg));
  }

  // BELOW ARE THE OLD METHODS OF CRUD WITHOUT ANY SERVER AND RESTAPI

  getAllTodos(){
    return this.todos;
   }

   addNewTask(newtodo : {"id":number,"task":string,"status":boolean}){
    this.todos.push(newtodo);
   }

   updateTask(updated_task:string, indx:number){
    this.todos[indx].task = updated_task;
   }

   deleteTask(indx:number){
    this.todos.splice(indx,1);
   }
}
