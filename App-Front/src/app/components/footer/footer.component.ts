import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  socialLinks = [
    { name: 'Facebook', url: '#', icon: '📘' },
    { name: 'Instagram', url: '#', icon: '📷' },
    { name: 'Twitter', url: '#', icon: '🐦' },
    { name: 'LinkedIn', url: '#', icon: '💼' }
  ];

  quickLinks = [
    { name: 'Nosotros', route: '/about' },
    { name: 'Cómo Funciona', route: '/how-it-works' },
    { name: 'Preguntas Frecuentes', route: '/faqs' },
    { name: 'Contacto', route: '/contact' }
  ];

  supportLinks = [
    { name: 'Centro de Ayuda', route: '/help' },
    { name: 'Términos de Servicio', route: '/terms' },
    { name: 'Política de Privacidad', route: '/privacy' },
    { name: 'Ser Socio', route: '/partner' }
  ];

  downloadLinks = [
    { name: 'App iOS', url: '#', icon: '📱' },
    { name: 'App Android', url: '#', icon: '🤖' }
  ];
}
