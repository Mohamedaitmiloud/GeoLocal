import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Clients } from '../Model/Clients';
import { AuthentificationService } from '../sevices/authentification.service';
import { ClientService } from '../sevices/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  clients:Clients[]
  loginForm:FormGroup
  message:string
  

  constructor(
    private authservice:AuthentificationService,
    private fb: FormBuilder,
    private clientService:ClientService,
    private router:Router,
    
    ) {

      this.loginForm=new FormGroup({
        email:new FormControl("",[Validators.required, 
                                  Validators.email]),
        password:new FormControl("",[Validators.required,
                                     Validators.minLength(6),]),
        
    })}

   // this.loginForm = this.fb.group(formControls)
  

 

  ngOnInit() {
   
  }
  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }


  login(){
    const logInfo=this.loginForm.value
    const logClient={
      email:logInfo.email,
      password:logInfo.password
    }
    this.clientService.getClients().subscribe((data)=>{
        this.clients=data
        console.log("clientList"+JSON.stringify(this.clients))
        for(let i=0; i < this.clients.length ; i++){
          if(logClient.email===this.clients[i].email &&logClient.password===this.clients[i].password){
            console.log("email and password are valid ")
              this.router.navigate(['/agm-map'])
          }else{

            this.message="email or password is invalid"
            console.log("email or password is invalid")
          }
    
        }
      }
    )
    
    

    //if(logClient.email===){}
  
/*
 /* login(){
    const data = this.loginForm.value
    //console.log(data)
   /* this.authservice.login(data.email,data.password).subscribe(data=>
      console.log(data))
    this.authservice.getClient().subscribe(data=>
      {
        console.log(data)
        //this.clients.push(data)
      })

      this.authservice.login(data.email,data.password).subscribe(
        res=>{
          console.log(res);
          let token = res.token;
          localStorage.setItem("myToken",token);
          this.router.navigate(['/agm-map']);
        },
        err=>{
          console.log(err);}
      )}*/

}
}