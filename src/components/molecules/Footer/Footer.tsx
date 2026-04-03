import React from 'react';
import styles from './Footer.module.scss';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
// import SocialLinks from '../social/SocialLinks';

/**
 * =========================================================
 * Footer
 * ---------------------------------------------------------
 * Componente de pie de página principal.
 *
 * Responsabilidades:
 * - Mostrar identidad del proyecto.
 * - Exponer información de contacto.
 * - Renderizar enlaces útiles externos.
 * - Mostrar redes sociales.
 * - Integrar textos internacionalizados.
 *
 * Arquitectura:
 * - Sección superior (3 columnas).
 * - Sección inferior (social + info legal).
 * - Soporte i18n vía useTranslation().
 *
 * Dependencias:
 * - useTranslation → textos dinámicos.
 * - SocialLinks → redes sociales reutilizables.
 * - Next Link → navegación interna/externa.
 * =========================================================
 */
const Footer: React.FC = () => {

  /**
   * Hook de traducción.
   * Extrae diccionario correspondiente al idioma activo.
   */
  const { t } = useTranslation();
  const texts = t.footer;

  /**
   * Lista de enlaces útiles del footer.
   * Se construye dinámicamente usando textos traducidos.
   */
  const linkItems = [
    {
      href: 'https://github.com/KrlozMedina/Techfolio/wiki',
      label: texts.links.documentation
    },
    {
      href: 'https://github.com/KrlozMedina/Techfolio/blob/main/LICENSE.md',
      label: texts.links.license
    },
    {
      href: '/api',
      label: texts.links.api
    },
  ];
  
  return (
    <footer className={styles.footer}>

      {/* ===================================================
        TOP SECTION
        - Proyecto
        - Contacto
        - Enlaces útiles
        =================================================== */}
      <div className={styles.footer__top}>

        {/* ================= PROJECT ================= */}
        <div className={styles.footer__column}>
          <h4 className={styles.footer__title}>
            {texts.project.title}
          </h4>
          <p>{texts.project.slogan}</p>
        </div>

        {/* ================= CONTACT ================= */}
        <div className={styles.footer__column}>
          <h4 className={styles.footer__title}>
            {texts.contact.title}
          </h4>

          <p>
            {texts.contact.email}:{' '}
            <Link
              href="mailto:kamedinal16@outlook.com"
              className={styles.footer__link}
            >
              kamedinal16@outlook.com
            </Link>
          </p>

          <p>
            {texts.contact.whatsApp}:{' '}
            <Link
              href="https://wa.me/573504312615"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__link}
            >
              +57 350 431 2615
            </Link>
          </p>
        </div>

        {/* ================= USEFUL LINKS ================= */}
        <div className={styles.footer__column}>
          <h4 className={styles.footer__title}>
            {texts.links.title}
          </h4>

          <ul className={styles.footer__list}>
            {linkItems.map(({ href, label }) => (
              <li key={href} className={styles.footer__item}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footer__link}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===================================================
        BOTTOM SECTION
        - Redes sociales
        - Copyright
        - Versión
        =================================================== */}
      <div className={styles.footer__bottom}>
        {/* <div className={styles.footer__social}>
          <SocialLinks />
        </div> */}

        <p className={styles.footer__copyright}>
          {texts.bottom.copyright}
        </p>

        <p className={styles.footer__copyright}>
          {texts.bottom.version}
        </p>
      </div>
    </footer>
  );
};

export default Footer;