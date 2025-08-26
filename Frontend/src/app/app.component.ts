import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <nav class="bg-white shadow-md fixed w-full z-50">
      <div class="container mx-auto px-6 py-3">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <a routerLink="/" class="text-2xl font-bold text-blue-600">Job<span class="text-purple-600">App</span></a>
            <div class="hidden md:flex ml-10 space-x-8">
              <a routerLink="/jobs" class="text-gray-700 hover:text-blue-600 transition">Jobs</a>
              <a routerLink="/companies" class="text-gray-700 hover:text-blue-600 transition">Companies</a>
              <a routerLink="/reviews" class="text-gray-700 hover:text-blue-600 transition">Reviews</a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="pt-16">
      <router-outlet></router-outlet>
    </main>

    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-6 text-center">
        <p>&copy; 2024 JobApp. All rights reserved.</p>
      </div>
    </footer>
  `,
  standalone: true,
  imports: [RouterOutlet, RouterLink]
})
export class AppComponent {
  title = 'JobApp';
}
