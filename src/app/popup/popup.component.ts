import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CourseService } from '../services/course.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input() state: string = 'user';
  @Output() close = new EventEmitter<any>();

  constructor(private courseService: CourseService, private authService: AuthService) { }

  courses:any;

  UserInput: any = {
    email: '',
    password: '',
    role: '',
    studentMail: ''
  };

  CourseInput: any = {
    name: '',
    source: ''
  }


  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses()
      .subscribe(courses => {
        this.courses = courses;
      }, error => {
        console.log('error fetching courses in popup', error);
      });
  }

  deleteCourse(id: string) {
    this.courseService.deleteCourse(id)
      .subscribe(() => {
        console.log('Course deleted successfully');
        this.loadCourses();
      }, error => {
        console.log('error deleting course', error);
      });
  }

  addCourse() {
    this.CourseInput.studentMail = 'string';
    this.courseService.addCourse(this.CourseInput)
      .subscribe(() => {
        console.log('Course added successfully');
        this.loadCourses();
        this.cross();
      }, error => {
        console.log('error adding course', error);
      });
  }

  addUser() {
    console.log(this.UserInput);
    this.authService.addUser(this.UserInput)
      .subscribe(() => {
        console.log('User added successfully');
        this.cross();
      }, error => {
        console.log('error adding user', error);
      });
  }

  cross() {
    this.close.emit();
  }
}
