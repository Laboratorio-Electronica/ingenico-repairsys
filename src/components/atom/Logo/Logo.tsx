import { useTranslation } from '@/hooks/useTranslation';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  /** Indica si el logo se renderiza dentro del header */
  inHeader?: boolean;
}

/**
 * Logo del sitio.
 * - Soporta i18n para el texto alternativo.
 * - Optimiza carga usando next/image.
 * - En el header actúa como enlace a la página principal.
 */
export const Logo: React.FC<Props> = ({ inHeader = false }) => {
  const { t } = useTranslation();

  // Texto alternativo accesible según contexto
  const alt = inHeader ? t.logo.header : t.logo.default;

  // Dimensiones y optimización según ubicación
  const width = inHeader ? 150 : 311;
  const height = inHeader ? 50 : 162;
  const size = inHeader ? '90px' : '300px';

  const image = (
    <Image
      src="/assets/logo.png"
      alt={alt}
      width={width}
      height={height}
      priority={inHeader} // LCP si está en header
      sizes={size}
    />
  );

  // En header, el logo es navegable
  return inHeader ? (
    <Link href="/" aria-label={alt}>
      {image}
    </Link>
  ) : (
    image
  );
};

export default Logo;
