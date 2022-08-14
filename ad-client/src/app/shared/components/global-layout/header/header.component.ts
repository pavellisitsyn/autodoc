import { Component, OnInit } from '@angular/core';
import { faHome, faLocationDot } from '@fortawesome/free-solid-svg-icons';


export interface Link {
  title: string,
  url: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faLocationDot = faLocationDot;
  faHome = faHome;

  links: Link[] = [
    {
      title: 'Регистрация',
      url: 'https://www.autodoc.ru/registration',
    },
    {
      title: 'Оплатить заказ',
      url: 'https://www.autodoc.ru/clients/instruction-pay',
    },
    {
      title: 'Получить заказ',
      url: 'https://www.autodoc.ru/clients/delivery',
    },
    {
      title: 'Каталоги',
      url: 'https://www.autodoc.ru/catalogs',
    },
    {
      title: 'Новости',
      url: 'https://www.autodoc.ru/news',
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  search() {
    // Поиск по артикулу / VIN
  }

  toggleMenu(): void {

  }

}
