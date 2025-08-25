import { motion } from "framer-motion";
import { AlertCircle, Ban, CookieIcon, FileText, Globe, Link2, RefreshCcw, ShieldCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>AM DECO | Conditions générales d’utilisation</title>
      </Helmet>

      <div className="px-2 py-5">
        <TittleAnimation 
          tittle="Conditions générales d’utilisation – AM DECO"
          subtittle="Dernière mise à jour : Juillet 2025"
        />

        {/* Intro */}
        <motion.p className="mb-6 text-lg leading-relaxed text-justify" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
          📌 Éditeur du site : <br/>
          AM DECO SARL, Société à responsabilité limitée (SARL) <br/>
          SIREN : 879 775 625, SIRET : 879 775 625 00012 <br/>
          TVA intracommunautaire : FR52879775625 <br/>
          Code APE : 4334Z – Travaux de peinture et vitrerie <br/>
          Siège social : 56 rue du Parc des Rigouts, 77190 Dammarie-les-Lys, France <br/>
          Dirigeant : Mazen BOUBAKER <br/>
          Email : <a href="mailto:contact@amdeco-renovation.fr" className="text-blue-600 underline">contact@amdeco-renovation.fr</a> <br/>
          Développement du site : Mozammel Hosen <br/>
          Design du site : <a href="https://www.linkedin.com/in/adelhorrig/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Adel Horrig</a>
        </motion.p>

        <motion.p className="mb-6 text-lg leading-relaxed text-justify" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
          🖥 Hébergeur : HOSTINGER operations, UAB, Švitrigailos str. 34, Vilnius 03230, Lituanie <br/>
          Email : <a href="mailto:domains@hostinger.com" className="text-blue-600 underline">domains@hostinger.com</a>
        </motion.p>

        {/* Sections */}
        {[
          {
            icon: <FileText className="text-purple-600" />,
            title: "1. Objet",
            content: (
              <p className="mb-6 text-lg text-justify">
                Les présentes Conditions Générales d’Utilisation (CGU) régissent l’accès et l’utilisation du site internet AM DECO (ci-après “le Site”), accessible à l’adresse www.amdeco-renovation.fr. En naviguant sur ce site ou en utilisant ses services, vous acceptez sans réserve les présentes conditions.
              </p>
            ),
          },
          {
            icon: <ShieldCheck className="text-green-600" />,
            title: "2. Services proposés",
            content: (
              <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                <li>Consulter des informations sur l’entreprise AM DECO, ses prestations et ses réalisations</li>
                <li>Visualiser des chantiers avant/après</li>
                <li>Lire des témoignages clients</li>
                <li>Réserver un rendez-vous pour un devis via un agenda intégré</li>
                <li>Accéder à un espace client sécurisé (pour les clients ayant signé un devis)</li>
                <li>Signaler des défauts (malfaçons) en ligne</li>
                <li>Télécharger des photos et réserver une intervention pour correction dans le cadre de la garantie de parfait achèvement</li>
              </ul>
            ),
          },
          {
            icon: <Link2 className="text-cyan-600" />,
            title: "3. Espace client et accès",
            content: (
              <p className="mb-6 text-lg text-justify">
                L’espace client est réservé aux clients ayant signé un devis. L’accès s’effectue via un identifiant unique attribué par AM DECO. Les utilisateurs s’engagent à conserver la confidentialité de leurs accès et à ne pas partager leur compte. AM DECO se réserve le droit de suspendre ou de supprimer tout compte en cas d’usage abusif.
              </p>
            ),
          },
          {
            icon: <Globe className="text-blue-500" />,
            title: "4. Propriété intellectuelle",
            content: (
              <p className="mb-6 text-lg text-justify">
                Tous les contenus présents sur le Site (textes, photos, vidéos, logo, design, structure, etc.) sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou réutilisation non autorisée est strictement interdite.
              </p>
            ),
          },
          {
            icon: <Ban className="text-red-600" />,
            title: "5. Limitations de responsabilité",
            content: (
              <p className="mb-6 text-lg text-justify">
                AM DECO met tout en œuvre pour offrir un site fiable, sécurisé et à jour. Toutefois, la société ne saurait être tenue responsable : d’erreurs ou d’inexactitudes dans les informations publiées, de l’indisponibilité temporaire ou prolongée du site, de tout dommage direct ou indirect lié à l’utilisation du site ou des services associés.
              </p>
            ),
          },
          {
            icon: <CookieIcon className="text-pink-600" />,
            title: "6. Données personnelles et cookies",
            content: (
              <p className="mb-6 text-lg text-justify">
                La navigation sur le site peut entraîner la collecte de données personnelles (via formulaire ou espace client). Les cookies utilisés servent uniquement à améliorer l’expérience utilisateur. Pour plus d’informations, consultez notre Politique de confidentialité.
              </p>
            ),
          },
          {
            icon: <RefreshCcw className="text-indigo-600" />,
            title: "7. Modifications",
            content: (
              <p className="mb-6 text-lg text-justify">
                AM DECO se réserve le droit de modifier les présentes conditions à tout moment. Toute nouvelle version sera publiée sur cette page avec sa date de mise à jour. L’utilisation continue du site implique votre acceptation des modifications.
              </p>
            ),
          },
          {
            icon: <AlertCircle className="text-orange-500" />,
            title: "8. Contact",
            content: (
              <p className="mb-6 text-lg text-justify">
                Pour toute question relative au site ou à ces CGU, vous pouvez nous contacter à l’adresse suivante : <a href="mailto:contact@amdeco-renovation.fr" className="text-blue-600 underline">contact@amdeco-renovation.fr</a>
              </p>
            ),
          },
        ].map((section, index) => (
          <motion.div key={index} variants={fadeUp} initial="hidden" animate="visible" custom={index + 3}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              {section.icon} {section.title}
            </h2>
            {section.content}
          </motion.div>
        ))}

        <motion.p className="text-xl font-semibold text-emerald-700 mt-10 text-justify" variants={fadeUp} initial="hidden" animate="visible" custom={20}>
          📘 Merci de faire confiance à AM DECO. Pour toute question sur ces conditions, veuillez nous contacter.
        </motion.p>
      </div>
    </>
  );
};

export default TermsAndConditions;
