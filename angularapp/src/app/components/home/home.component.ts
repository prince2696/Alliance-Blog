
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Announcement } from 'src/app/models/announcement.model';
import { BlogPost } from 'src/app/models/blog-post.model';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AuthService } from 'src/app/services/auth.service';
import { BlogPostService } from 'src/app/services/blog-post.service';
import { ROLE_KEY } from '../constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  cards :BlogPost[]=[];
  cardsFiltered:BlogPost[]=[];
  currentCard: number = 0;
  intervalId: any;
  announcements: Announcement[] = [];

  constructor(private announcementService: AnnouncementService,private blogService:BlogPostService,public authService:AuthService) { }
  
   role:string=localStorage.getItem(ROLE_KEY);
  
  getBlogs(){
    this.blogService.getAllBlogPosts().subscribe((data)=>{
         this.cards=data;
         this.cardsFiltered=this.cards.filter(card=>card.Status==='Approved')
    })
  }
  ngOnInit(): void {
    this.startSliding();
    this.loadAnnouncements();
    this.getBlogs();
    console.log(this.role);
  }

  ngOnDestroy(): void {
    this.stopSliding();
  }

  nextCard() {
    this.currentCard++;
    this.updateCardPosition();
  }

  goToCard(index: number) {
    this.currentCard = index;
    this.updateCardPosition();
  }

  startSliding() {
    this.intervalId = setInterval(() => this.nextCard(), 1200); // Change card every 1.2 seconds
  }

  stopSliding() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateCardPosition() {
    const cardWrapper = document.querySelector('.card-wrapper') as HTMLElement;
    const totalCards = this.cards.length;
    const cardWidth = 100 / totalCards;
    
    if (this.currentCard >= totalCards) {
      this.currentCard = 0;
      cardWrapper.style.transition = 'none';
      cardWrapper.style.transform = `translateX(0)`;
      setTimeout(() => {
        cardWrapper.style.transition = 'transform 0.5s ease-in-out';
        this.currentCard++;
        cardWrapper.style.transform = `translateX(-${this.currentCard * cardWidth}%)`;
      }, 50);
    } else {
      cardWrapper.style.transition = 'transform 0.5s ease-in-out';
      cardWrapper.style.transform = `translateX(-${this.currentCard * cardWidth}%)`;
    }
  }

  loadAnnouncements() {
    this.announcementService.getAllAnnouncements().subscribe(announces => {
      this.announcements = announces.filter(announcement => announcement.Status === "Active");
      this.updateMarqueeText(); // Update marquee text with announcements
      console.log(this.announcements);
    });
  }

  // updateMarqueeText() {
  //   const marqueeText = document.getElementById('marquee-text') as HTMLElement;
  //   const announcementTexts = this.announcements.map(announcement => announcement.Title); // Assuming Title property contains the announcement text
  //   marqueeText.innerHTML = announcementTexts.join(' • '); // Use ' • ' as a separator
  // }

  updateMarqueeText() {
    const marqueeText = document.getElementById('marquee-text') as HTMLElement;
    const announcementTexts = this.announcements.map(announcement => announcement.Title); // Assuming Title property contains the announcement text
    let repeatedAnnouncements = announcementTexts;

    // Repeat the announcements multiple times
    for (let i = 0; i < 10; i++) { // Adjust the number of repetitions as needed
        repeatedAnnouncements = repeatedAnnouncements.concat(announcementTexts);
    }

    marqueeText.innerHTML = repeatedAnnouncements.join('&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;'); // Use ' • ' as a separator
}
}