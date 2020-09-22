import {Component, ViewChild, TemplateRef, OnInit} from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, format, parse} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {BookingService} from '../../Services/Booking/booking.service';
import {RoomService} from '../../Services/Room/room.service';
import { Booking } from '../../Models/Booking';
import { Room } from '../../Models/Room';
import { CalendarMeta } from '../../Models/CalendarMeta';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrls: ['./createbooking.component.css']
})
export class CreatebookingComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent<CalendarMeta>[] = [];
  newEvent: CalendarEvent<CalendarMeta>;

  editingEvents: number[] = [-1];
  disabled = true;

  room: Room;

  activeDayIsOpen = false;

  constructor(private modal: NgbModal, private bookingService: BookingService, private roomsService: RoomService) {}

  ngOnInit(): void{
    this.getEvent();
    this.getRooms();
  }

  getEvent(): void{
    this.events = [];
    this.bookingService.getAllBooking()
      .subscribe(response => {
        for ( const item of response)
        {
          const event: CalendarEvent<CalendarMeta> = {
            id: item.id,
            start: new Date(item.from),
            end: new Date(item.to),
            title: format(new Date(item.from), 'H:mm') + ' ' + item.memberName,
            color: colors.red,
            actions: this.actions,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
            meta: {
              memberName: item.memberName,
              memberEmail: item.memberEmail
            }
          };

          this.events = [...this.events, event];
        }
        console.log(this.events);
      });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    // this.handleEvent('Dropped or resized', event);
    this.dataChanged(event);
  }

  dataChanged(event: CalendarEvent): void{
    this.editingEvents.push(parseInt(event.id.toString(), null));

    // const index = this.events.findIndex(x => x.id === event.id);
    // console.log(index);
    // this.events[index].title = 'Thay doi goi ne';
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [...this.events, {
        id: -1,
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        meta: {
          memberName: '',
          memberEmail: ''
        }
    }];
  }

  saveEvent(event: CalendarEvent<CalendarMeta>): void{
    if (event.start > event.end) {
      alert('Start must be before End');
      return;
    }
    const booking: Booking = {
      id: parseInt(event.id.toString(), null),
      from: format(event.start, 'Y/M/d H:m'),
      to: format(event.end, 'Y/M/d H:m'),
      roomID: this.room.id,
      memberName: event.meta.memberName,
      memberEmail: event.meta.memberEmail
    };
    if (event.id === -1)
    {
      this.bookingService.createBooking(booking)
        .subscribe(result => {
          console.log(result);
          this.getEvent();
        },
        error => {
          this.handleError(error);
        });
    }else{
      this.bookingService.updateBooking(booking)
        .subscribe(result => {
          console.log(result);
          this.editingEvents = this.editingEvents.filter(value => {
            return value !== booking.id;
          });
          this.getEvent();
        }, error => {
          this.handleError(error);
        });
    }
  }

  handleError(error): void{
    console.log(error);
    alert(error.error);
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.bookingService.deleteBooking(parseInt(eventToDelete.id.toString(), null))
      .subscribe(result => {
        this.events = this.events.filter((event) => event !== eventToDelete);
      });
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }

  getRooms(): void{
    this.roomsService.getRoom()
      .subscribe(result => this.room = result[0]);
  }

}
