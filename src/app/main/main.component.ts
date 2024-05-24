import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, PopupComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  courses: any[] = [];
  userRole:any;
  isLoading: boolean = false;
  error: string | null = null;

  blurBackground: boolean = false;
  showPopup: boolean = false;
  state:any;

  constructor(private courseService: CourseService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.courseService.getCourses()
      .subscribe(courses => {
        console.log(courses);
        this.courses = courses;
        this.isLoading = false;
        this.userRole = this.authService.getRole();

      }, error => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  closePopup() {
    this.showPopup = false;
    this.blurBackground = false;
  }
  course() {
    this.state = 'course';
    this.blurBackground = true;
    this.showPopup = true;
  }
  addUser() {
    this.state = 'add';
    this.blurBackground = true;
    this.showPopup = true;
  }
}

