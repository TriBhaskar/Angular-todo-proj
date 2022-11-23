import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TddataService } from '../shared/tddata.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styles: [
  ]
})
export class TodolistComponent implements OnInit {

  todos: {"id":number,"task":string,"status":boolean}[] = [];
  singletodo: {"id":number,"task":string,"status":boolean};
  taskname :string ="";
  show_add_btn :boolean =true;
  show_up_btn :boolean =false;
  curr_task_name :string="";
  curr_task_index :number=0;
  constructor(private tdd:TddataService) {
    this.load_todos();
    this.singletodo = {"id":0, "task":"none","status":false};
   }

  ngOnInit(): void {
  }

  //fetching data from rest APi using service class || HTTP GET CALL
  load_todos(){
    return this.tdd.getTodoList().subscribe((data: any) => { this.todos = data;});

  }

  //add new task | HTTP POST call

  add_todo_restapi(){
    if(this.curr_task_name=="")
    {
      alert("INvalid Task Name")
      return;
    }
    //compose task object
    this.singletodo.id =  this.todos.length + 1;
    this.singletodo.task = this.curr_task_name;
    this.singletodo.status = false;
    this.create_task(this.singletodo);
  }

  create_task(newTask : any){
    console.log("in create_task()");
    this.tdd.addNewTaskAPI(this.singletodo).subscribe((data:any) => {
      this.load_todos();
      this.curr_task_name="";
    });
  }

  edit_task_restapi(curr_task:string, id:number){
    this.curr_task_name = curr_task;
    this.curr_task_index = id;

    this.show_add_btn=false;
    this.show_up_btn=true;
  }

  update_todo_restapi(){
    console.log(" in update_todo_restapi()");
    //updateTaskAPI
    if(window.confirm('Are you sure, want to update ? Id : '+this.curr_task_index)){
      this.singletodo.id = this.curr_task_index;
      this.singletodo.task = this.curr_task_name;
      this.singletodo.status = false;
      
      console.log(this.singletodo);
      this.tdd.updateTaskAPI(this.singletodo,this.curr_task_index).subscribe((data) =>{
        this.load_todos();

        //hide 'update' button and show 'add' button
        this.show_add_btn=true;
        this.show_up_btn=false;
        this.curr_task_name="";
      });
    }
  }

  delete_task_restapi(id:number){

    if (window.confirm('Are you sure, you want to delete ? Id: '+id)) {
      this.tdd.deleteTaskAPI(id).subscribe((data) =>{
        this.load_todos();
      });
    }
  }


//previous methods

  add_todo(){
    this.tdd.addNewTask({"id":this.todos.length+1,"task":this.curr_task_name,"status":true})
  }
  update_todo(){
    this.tdd.updateTask(this.curr_task_name, this.curr_task_index)

    this.show_add_btn =true;
    this.show_up_btn  =false;
  }
  remove_todo(i:number){
    this.tdd.deleteTask(i);
  }
  edit_todo(curr_task:string, i:number){
    this.curr_task_name=curr_task;
    this.curr_task_index=i;
    this.show_add_btn =false;
    this.show_up_btn  =true;
  }

}
