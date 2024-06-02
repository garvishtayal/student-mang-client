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
  @Output() update = new EventEmitter<any>();

  constructor(private courseService: CourseService, private authService: AuthService) { }

  courses: any;
  studentMails: any;
  userRole: any;

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

  assignCourseData: any = {
    studentId: '',
    courseId: []
  }


  ngOnInit() {
    this.loadCourses();
    this.loadStudents();
    this.userRole = this.authService.getRole();
    console.log("user")
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
        this.update.emit();
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
        this.update.emit();
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

  loadStudents() {
    this.authService.fetchStudents()
      .subscribe(mails => {
        this.studentMails = mails;
        console.log(mails);
      }, error => {
        console.log('error fetching student mails in popup', error);
      });
  }

  cross() {
    this.close.emit();
  }

  onCourseCheckboxChange(event: any, courseId: number) {
    if (event.target.checked) {
      this.assignCourseData.courseId.push(courseId);
    } else {
      const index = this.assignCourseData.courseId.indexOf(courseId);
      if (index > -1) {
        this.assignCourseData.courseId.splice(index, 1);
      }
    }
  }

  assignCourses() {
    console.log(this.assignCourseData);
    this.courseService.assignCourse(this.assignCourseData)
      .subscribe((res) => {
        console.log('courses assigned successfully', res)
      }, error => {
        console.log('error assigning courses', error);
      });
  }


}
