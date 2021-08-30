import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Clients } from '../Model/Clients';
import { ClientService } from '../sevices/client.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  client:Clients
 
  alert:boolean=false
  register:FormGroup
  constructor(private router:Router,
              private clientService :ClientService,
              ) { 
                this.register=new FormGroup({
                  username:new FormControl("",[Validators.required,
                                               Validators.minLength(2),
                                               Validators.pattern("^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$")]),
                  email:new FormControl("",[Validators.required, 
                                            Validators.email]),
                  password:new FormControl("",[Validators.required,
                                               Validators.minLength(6),]),
                  confirmpassword:new FormControl("",[Validators.required])})
               
              }

 

  ngOnInit() {
   

      
  }
  
  

 /* resetForm(){
    if(this.register!=null){
      this.register.reset()
    }
    this.client={
      username:'',
      email:'',
      password:''
    }
  }*/
  //recuperer les valeur du formulaire
  onSubmit(){
   /* this.client={
      username:this.register.get('username').value,
      email:this.register.get('email').value,
      password:this.register.get('password').value
    }*/
    const formValue=this.register.value;
      const client={
        username:formValue.username,
        email:formValue.email,
        password: formValue.password
      }
    
   
    this.clientService.registerClient(client).subscribe((data)=> 
    {
     console.log( data)
     this.router.navigate(['/login'])
    },
    (error)=>{
      console.log(error)
    }
    )
    //this.resetForm();
    
    
}
get username(){
  return this.register.get("username")
}
get email(){
  return this.register.get('email')
}
get password(){
  return this.register.get('password')
}
get confirmpassword(){
  return this.register.get('confirmpassword')
}
/*ngOnDestroy(): void {
   this.csSubscription.unsubscribe()
}*/
}
