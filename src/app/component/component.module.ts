import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
// import { NgbdpregressbarBasicComponent } from './progressbar/progressbar.component';
// import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
// import { NgbdAccordionBasicComponent } from './accordion/accordion.component';
// import { NgbdAlertBasicComponent } from './alert/alert.component';
// import { NgbdCarouselBasicComponent } from './carousel/carousel.component';
// import { NgbdDatepickerBasicComponent } from './datepicker/datepicker.component';
// import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
// import { NgbdModalBasicComponent } from './modal/modal.component';
// import { NgbdPopTooltipComponent } from './popover-tooltip/popover-tooltip.component';
// import { NgbdratingBasicComponent } from './rating/rating.component';
// import { NgbdtabsBasicComponent } from './tabs/tabs.component';
// import { NgbdtimepickerBasicComponent } from './timepicker/timepicker.component';
// import { ButtonsComponent } from './buttons/buttons.component';
// import { CardsComponent } from './card/card.component';
// import { ToastComponent } from './toast/toast.component';
// import { ToastsContainer } from './toast/toast-container';
import { CreatebookingComponent } from './createbooking/createbooking.component';
import { CreateLeaveRequestComponent } from './create-leave-request/createleave.component';
import {LeaveComponent} from './leave-request/leave.component';
import { MessageComponent } from '../shared/message/message.component';

// Angular Calendar
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {FlatpickrModule} from 'angularx-flatpickr';

// @angular/material
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FlatpickrModule.forRoot(),

    // @angular/material
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatInputModule
  ],
  declarations: [
    // NgbdpregressbarBasicComponent,
    // NgbdpaginationBasicComponent,
    // NgbdAccordionBasicComponent,
    // NgbdAlertBasicComponent,
    // NgbdCarouselBasicComponent,
    // NgbdDatepickerBasicComponent,
    // NgbdDropdownBasicComponent,
    // NgbdModalBasicComponent,
    // NgbdPopTooltipComponent,
    // NgbdratingBasicComponent,
    // NgbdtabsBasicComponent,
    // NgbdtimepickerBasicComponent,
    // ButtonsComponent,
    // CardsComponent,
    // ToastComponent,
    // ToastsContainer,
    CreatebookingComponent,
    CreateLeaveRequestComponent,
    LeaveComponent,
    MessageComponent
  ]
})
export class ComponentsModule {}
