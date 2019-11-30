import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatToolbarModule
  ],
  exports:[
   MatTabsModule,
   MatCheckboxModule,
   MatRadioModule,
   MatToolbarModule
  ]
})
export class MaterialModuleComponent { }
