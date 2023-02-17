import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { TopbarComponent } from './topbar/topbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    declarations: [
        TopbarComponent,
        NavbarComponent,
        ContentComponent,
    ],
    exports: [
        TopbarComponent,
        NavbarComponent,
        ContentComponent
    ]
})
export class TemplatePartsModule { }
