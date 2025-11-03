import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Service {
  id: string;
  title: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services: Service[] = [
    {
      id: 'botox',
      title: 'BOTOX',
      image: 'img/botox.jpeg',
      shortDescription: 'Traitement anti-rides',
      fullDescription: 'Le Botox est un traitement injectable qui réduit temporairement l\'apparence des rides et ridules en relaxant les muscles du visage. Idéal pour les rides du front, les pattes d\'oie et les rides du lion.'
    },
    {
      id: 'prp',
      title: 'PRP',
      image: 'img/prp.jpg',
      shortDescription: 'Plasma Riche en Plaquettes',
      fullDescription: 'Le PRP (Plasma Riche en Plaquettes) utilise votre propre sang pour stimuler la régénération cellulaire, améliorer la texture de la peau et favoriser la croissance des cheveux.'
    },
    {
      id: 'peeling',
      title: 'PEELING',
      image: 'img/peeling.jpg',
      shortDescription: 'Exfoliation profonde',
      fullDescription: 'Le peeling chimique élimine les cellules mortes de la peau, améliore le teint, réduit les taches pigmentaires et stimule le renouvellement cellulaire pour une peau plus lumineuse.'
    },
    {
      id: 'skinbooster',
      title: 'SKINBOOSTER',
      image: 'img/skinbooster.jpg',
      shortDescription: 'Hydratation intense',
      fullDescription: 'Les skinboosters sont des injections d\'acide hyaluronique qui hydratent en profondeur, améliorent l\'élasticité de la peau et lui donnent un aspect plus jeune et éclatant.'
    },
    {
      id: 'laser',
      title: 'LASER',
      image: 'img/laser.jpg',
      shortDescription: 'Traitement laser',
      fullDescription: 'Les traitements laser permettent de traiter diverses problématiques cutanées : rides, taches, cicatrices, épilation définitive et rajeunissement de la peau.'
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const headerOffset = 80; // height of the fixed header (h-20)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['accueil', 'services', 'temoignages', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed w-full bg-transparent z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img src="img/logo.png" alt="Logo" className="h-20 w-auto" />
            </div>

            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection('accueil')}
                className={`text-white hover:text-gray-200 font-medium transition-colors pb-1 border-b-3 ${activeSection === 'accueil' ? 'border-[#08244d]' : 'border-transparent'}`}
              >
                ACCUEIL
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className={`text-white hover:text-gray-200 font-medium transition-colors pb-1 border-b-3 ${activeSection === 'services' ? 'border-[#08244d]' : 'border-transparent'}`}
              >
                SERVICES
              </button>
              <button
                onClick={() => scrollToSection('temoignages')}
                className={`text-white hover:text-gray-200 font-medium transition-colors pb-1 border-b-3 ${activeSection === 'temoignages' ? 'border-[#08244d]' : 'border-transparent'}`}
              >
                TÉMOIGNAGES
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className={`text-white hover:text-gray-200 font-medium transition-colors pb-1 border-b-3 ${activeSection === 'faq' ? 'border-[#08244d]' : 'border-transparent'}`}
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`text-white hover:text-gray-200 font-medium transition-colors pb-1 border-b-3 ${activeSection === 'contact' ? 'border-[#08244d]' : 'border-transparent'}`}
              >
                CONTACT
              </button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('accueil')} className="block w-full text-left py-2 text-gray-800 hover:text-[#08244d] font-medium">ACCUEIL</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 text-gray-800 hover:text-[#08244d] font-medium">SERVICES</button>
              <button onClick={() => scrollToSection('temoignages')} className="block w-full text-left py-2 text-gray-800 hover:text-[#08244d] font-medium">TÉMOIGNAGES</button>
              <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-2 text-gray-800 hover:text-[#08244d] font-medium">FAQ</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-gray-800 hover:text-[#08244d] font-medium">CONTACT</button>
            </div>
          </div>
        )}
      </header>

      <main className="pt-0">
        <section id="accueil" className="relative h-screen flex items-center" style={{ background: 'linear-gradient(to bottom, #08244d, #c5c5ba)' }}>
          <div className="absolute inset-0 flex items-center justify-end">
            <img src="img/1.png" alt="Dr. Mehdi Lahbabi" className="h-full object-contain object-right" style={{ maxWidth: '50%' }} />
          </div>
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: '#08244d' }}>DR. <span className="text-white">MEHDI LAHBABI</span></h1>
              </div>
              <p className="text-lg md:text-3xl mb-10 leading-relaxed" style={{ color: '#08244d' }}>
                Médecine esthétique et anti-âge,<br/>votre beauté en toute sécurité
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-[#08244d] text-white px-6 py-3 font-semibold text-base hover:bg-opacity-90 transition-colors inline-flex items-center gap-3"
              >
                PRENDRE RENDEZ-VOUS
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <section id="services" className="py-20" style={{ backgroundColor: '#c5c5ba' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#08244d' }}>Nos Services</h2>
            
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 }
              }}
              className="services-swiper"
            >
              {services.map((service) => (
                <SwiperSlide key={service.id}>
                  <div
                    className="relative cursor-pointer group overflow-hidden rounded-lg"
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08244d] to-transparent opacity-80"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <button className="flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all">
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-2 lg:px-2 text-center">
            <p
              className="text-xl md:text-3xl lg:text-2xl leading-relaxed"
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: '#08244d',
                fontWeight: 400
              }}
            >
              Des soins sûrs, personnalisés et fondés sur une expertise médicale reconnue.
            </p>
          </div>
        </section>

        

        {selectedService && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <div
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-[#08244d]" />
                </button>
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4" style={{ color: '#08244d' }}>{selectedService.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{selectedService.fullDescription}</p>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    scrollToSection('contact');
                  }}
                  className="bg-[#08244d] text-white px-6 py-3 rounded font-semibold hover:bg-opacity-90 transition-colors inline-flex items-center gap-2"
                >
                  Prendre Rendez-vous
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        <section id="temoignages" className="py-20" style={{ backgroundColor: '#c5c5ba' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#08244d' }}>Découvrez l'expérience de nos patients</h2>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              className="testimonials-swiper"
            >
              <SwiperSlide>
                <div className="relative rounded-2xl mx-2 p-6" style={{ border: '3px solid #08244d', backgroundColor: 'transparent' }}>
                  <div className="absolute top-4 left-4">
                    <img src="img/Symbole.png" alt="Quote" className="w-12 h-12" />
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <img src="img/Symbole.png" alt="Quote" className="w-12 h-12 transform rotate-180" />
                  </div>
                  <div className="pt-12 pb-4">
                    <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#08244d' }}>BASMA BAMI</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-6 text-center">
                      Super expérience au cabinet du Dr Mehdi Lahbabi. Il est vraiment à l'écoute et prend le temps d'expliquer chaque étape, ce qui met tout de suite en confiance. Le cabinet est propre, moderne et très bien équipé.
                    </p>
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6" fill="#FFD700" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="relative rounded-2xl mx-2 p-6" style={{ border: '3px solid #08244d', backgroundColor: 'transparent' }}>
                  <div className="absolute top-4 left-4">
                    <img src="img/Symbole.png" alt="Quote" className="w-12 h-12" />
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <img src="img/Symbole.png" alt="Quote" className="w-12 h-12 transform rotate-180" />
                  </div>
                  <div className="pt-12 pb-4">
                    <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#08244d' }}>AMAL FARISS</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-6 text-center">
                      Je tiens à vous remercier pour votre travail chalant, votre soutien, votre bons conseils. Votre humilité  vos gentillesses ont été grandement appréciées. Vraiment j'ai bcp aime le soin. Je suis très satisfaite du résultat.
                    </p>
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6" fill="#FFD700" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="relative rounded-2xl mx-2 p-6" style={{ border: '3px solid #08244d', backgroundColor: 'transparent' }}>
                  <div className="absolute top-4 left-4">
                    <img src="img/Symbole.png" alt="Quote" className="w-12 h-12" />
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <img src="img/Symbole.png" alt="Quote" className="w-12 h-12 transform rotate-180" />
                  </div>
                  <div className="pt-12 pb-4">
                    <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#08244d' }}>YARA LATIS</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-6 text-center">
                      Bonjour je recommande vivement ce médecin professionnel et à l'écoute, j'ai effectué des injections aux cernes à cause d'un complexe qui me faisait souffrir depuis des années il m'a bien conseillé maintenant je suis très satisfaite du résultat encore mille merci.
                    </p>
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6" fill="#FFD700" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>

        <section id="faq" className="py-20" style={{ backgroundColor: '#c5c5ba' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#08244d' }}>Vos questions, nos réponses</h2>

            <div className="space-y-4">
              <div className="border-2 rounded-lg" style={{ borderColor: '#08244d', backgroundColor: 'transparent' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                  className="w-full p-6 flex justify-between items-center text-left"
                >
                  <h3 className="text-xl font-bold" style={{ color: '#08244d' }}>Comment prendre rendez-vous ?</h3>
                  <svg
                    className={`w-6 h-6 transition-transform ${openFaq === 0 ? 'rotate-180' : ''}`}
                    style={{ color: '#08244d' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === 0 && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">Vous pouvez prendre rendez-vous par téléphone, par email ou directement au cabinet. Nous nous efforçons de vous proposer des créneaux adaptés à vos disponibilités.</p>
                  </div>
                )}
              </div>

              <div className="border-2 rounded-lg" style={{ borderColor: '#08244d', backgroundColor: 'transparent' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                  className="w-full p-6 flex justify-between items-center text-left"
                >
                  <h3 className="text-xl font-bold" style={{ color: '#08244d' }}>Le Botox fige-t-il le visage ?</h3>
                  <svg
                    className={`w-6 h-6 transition-transform ${openFaq === 1 ? 'rotate-180' : ''}`}
                    style={{ color: '#08244d' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === 1 && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">Non, lorsqu'il est administré correctement par un professionnel qualifié, le Botox permet de conserver une expressivité naturelle tout en réduisant les rides. L'objectif est d'obtenir un résultat harmonieux et naturel.</p>
                  </div>
                )}
              </div>

              <div className="border-2 rounded-lg" style={{ borderColor: '#08244d', backgroundColor: 'transparent' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                  className="w-full p-6 flex justify-between items-center text-left"
                >
                  <h3 className="text-xl font-bold" style={{ color: '#08244d' }}>Comment savoir quel traitement est fait pour moi ?</h3>
                  <svg
                    className={`w-6 h-6 transition-transform ${openFaq === 2 ? 'rotate-180' : ''}`}
                    style={{ color: '#08244d' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === 2 && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">Lors d'une première consultation, nous évaluons ensemble vos besoins et vos attentes. Après un examen approfondi, je vous recommande le traitement le plus adapté à votre situation et à vos objectifs esthétiques.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20" style={{ backgroundColor: '#c5c5ba' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold inline-block" style={{ color: '#08244d' }}>
                RÉSERVEZ VOTRE{' '}
                <span className="px-4 py-1" style={{ backgroundColor: '#f9b400' }}>CONSULTATION</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <img src="img/logo.png" alt="Dr. Mehdi Lahbabi" className="w-full max-w-md" />
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Nom Complet</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#08244d]"
                      style={{ borderColor: '#d1d5db' }}
                      placeholder="Entrez votre nom complet"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Choisissez Votre Soin</label>
                    <select
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#08244d] bg-white"
                      style={{ borderColor: '#d1d5db' }}
                    >
                      <option value="">Sélectionnez un soin</option>
                      <option value="botox">BOTOX</option>
                      <option value="prp">PRP</option>
                      <option value="peeling">PEELING</option>
                      <option value="skinbooster">SKINBOOSTER</option>
                      <option value="laser">LASER</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Numéro de Téléphone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#08244d]"
                      style={{ borderColor: '#d1d5db' }}
                      placeholder="+212 XXX XXX XXX"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#08244d]"
                        style={{ borderColor: '#d1d5db' }}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Heure</label>
                      <input
                        type="time"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#08244d]"
                        style={{ borderColor: '#d1d5db' }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg font-bold text-white text-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#f9b400' }}
                  >
                    PRENDRE MON RENDEZ-VOUS
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12" style={{ backgroundColor: '#08244d' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Dr. Mehdi Lahbabi</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Médecin esthétique diplômé, spécialisé dans les traitements anti-âge et la médecine esthétique avancée.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+212 522 28 78 98</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+212 666 28 78 98</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1" />
                  <span>Casablanca, 162 boulevard Yacoub El Mansour<br />
                  Résidence Mam7 Center - 3ème étage - Bureau 302</span>
                </p>
                <p className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-1" />
                  <span>
                    Lundi-Vendredi: 9h00-18h00<br />
                    Samedi: Sur RDV uniquement
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Suivez-nous</h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: '#f9b400' }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: '#f9b400' }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/212666287898"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: '#f9b400' }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Dr. Mehdi Lahbabi. Tous droits réservés. | Mentions légales | Politique de confidentialité
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
