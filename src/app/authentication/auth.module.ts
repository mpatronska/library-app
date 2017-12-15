import { NgModule } from '@angular/core';

import { authenticationComponents } from  './index';

// Modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Services
import { AuthService } from './auth.service';

@NgModule({
  declarations: [ 
    ...authenticationComponents
  ],
  imports: [ 
    CommonModule, 
    FormsModule,
    HttpClientModule
  ],
  exports: [ 
    ...authenticationComponents
  ],
  providers: [ AuthService ]
})
export class AuthModule {  } 