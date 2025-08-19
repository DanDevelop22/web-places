import React from 'react';
import Button from '../atoms/Button';
import FormField from '../atoms/FormField';

const StyleDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark-50 to-brand-dark-100 dark:from-brand-dark-900 dark:to-brand-dark-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-gradient text-5xl font-bold mb-4">DóndeTú</h1>
          <p className="text-brand-dark-600 dark:text-brand-dark-400 text-xl">
            Demostración de Estilos del Brand
          </p>
        </div>

        {/* Sección de Colores */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-6">
            Paleta de Colores
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card-brand p-6 text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-brand mx-auto mb-3"></div>
              <p className="font-semibold text-brand-dark-900 dark:text-brand-dark-100">Primary</p>
              <p className="text-sm text-brand-dark-600 dark:text-brand-dark-400">#FF006E</p>
            </div>
            <div className="card-brand p-6 text-center">
              <div className="w-16 h-16 bg-brand-secondary rounded-brand mx-auto mb-3"></div>
              <p className="font-semibold text-brand-dark-900 dark:text-brand-dark-100">Secondary</p>
              <p className="text-sm text-brand-dark-600 dark:text-brand-dark-400">#FF6B35</p>
            </div>
            <div className="card-brand p-6 text-center">
              <div className="w-16 h-16 bg-brand-accent rounded-brand mx-auto mb-3"></div>
              <p className="font-semibold text-brand-dark-900 dark:text-brand-dark-100">Accent</p>
              <p className="text-sm text-brand-dark-600 dark:text-brand-dark-400">#FF8E53</p>
            </div>
            <div className="card-brand p-6 text-center">
              <div className="w-16 h-16 bg-brand-gradient rounded-brand mx-auto mb-3"></div>
              <p className="font-semibold text-brand-dark-900 dark:text-brand-dark-100">Gradient</p>
              <p className="text-sm text-brand-dark-600 dark:text-brand-dark-400">Magenta → Naranja</p>
            </div>
          </div>
        </section>

        {/* Sección de Botones */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-6">
            Botones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="primary" size="lg">
              Botón Principal
            </Button>
            <Button variant="secondary" size="lg">
              Botón Secundario
            </Button>
            <Button variant="outline" size="lg">
              Botón Outline
            </Button>
            <Button variant="ghost" size="lg">
              Botón Ghost
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Button variant="primary" size="sm">Pequeño</Button>
            <Button variant="primary" size="md">Mediano</Button>
            <Button variant="primary" size="lg">Grande</Button>
          </div>
        </section>

        {/* Sección de Cards */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-6">
            Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-brand p-6">
              <h3 className="text-xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-3">
                Card Básica
              </h3>
              <p className="text-brand-dark-600 dark:text-brand-dark-400 mb-4">
                Esta es una card con los estilos del brand de DóndeTú.
              </p>
              <Button variant="primary">Acción</Button>
            </div>
            <div className="card-brand p-6">
              <div className="w-12 h-12 bg-brand-gradient rounded-brand mb-4"></div>
              <h3 className="text-xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-3">
                Con Icono
              </h3>
              <p className="text-brand-dark-600 dark:text-brand-dark-400">
                Card con un icono decorativo usando el gradiente del brand.
              </p>
            </div>
            <div className="card-brand p-6">
              <span className="badge-brand mb-4">Nuevo</span>
              <h3 className="text-xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-3">
                Con Badge
              </h3>
              <p className="text-brand-dark-600 dark:text-brand-dark-400">
                Card que incluye un badge con el gradiente del brand.
              </p>
            </div>
          </div>
        </section>

        {/* Sección de Formularios */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-6">
            Formularios
          </h2>
          <div className="max-w-md">
            <FormField
              name="name"
              label="Nombre"
              placeholder="Tu nombre completo"
              required
            />
            <FormField
              name="email"
              label="Email"
              type="email"
              placeholder="tu@email.com"
              required
            />
            <FormField
              name="message"
              label="Mensaje"
              as="textarea"
              rows={4}
              placeholder="Escribe tu mensaje aquí..."
            />
            <div className="mt-6">
              <Button variant="primary" type="submit" className="w-full">
                Enviar Mensaje
              </Button>
            </div>
          </div>
        </section>

        {/* Sección de Efectos */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-6">
            Efectos y Animaciones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-brand p-6 text-center">
              <div className="w-16 h-16 bg-brand-gradient rounded-brand mx-auto mb-4 animate-brand-pulse"></div>
              <h3 className="font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-2">
                Efecto Pulse
              </h3>
              <p className="text-brand-dark-600 dark:text-brand-dark-400">
                Animación de pulso con colores del brand
              </p>
            </div>
            <div className="card-brand p-6 text-center">
              <div className="w-16 h-16 bg-brand-gradient rounded-brand mx-auto mb-4 animate-brand-glow"></div>
              <h3 className="font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-2">
                Efecto Glow
              </h3>
              <p className="text-brand-dark-600 dark:text-brand-dark-400">
                Efecto de brillo inspirado en el logo
              </p>
            </div>
            <div className="card-brand p-6 text-center">
              <div className="brand-spinner mx-auto mb-4"></div>
              <h3 className="font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-2">
                Spinner
              </h3>
              <p className="text-brand-dark-600 dark:text-brand-dark-400">
                Indicador de carga con colores del brand
              </p>
            </div>
          </div>
        </section>

        {/* Sección de Tipografía */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-6">
            Tipografía
          </h2>
          <div className="space-y-4">
            <h1 className="text-gradient text-4xl font-bold">Título con Gradiente</h1>
            <h2 className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100">
              Título Principal
            </h2>
            <h3 className="text-2xl font-semibold text-brand-dark-800 dark:text-brand-dark-200">
              Subtítulo
            </h3>
            <p className="text-lg text-brand-dark-700 dark:text-brand-dark-300">
              Texto de párrafo con el color del brand.
            </p>
            <p className="text-brand-dark-600 dark:text-brand-dark-400">
              Texto secundario para descripciones y detalles.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8">
          <p className="text-brand-dark-600 dark:text-brand-dark-400">
            © 2024 DóndeTú - Todos los derechos reservados
          </p>
        </footer>
      </div>
    </div>
  );
};

export default StyleDemo;
