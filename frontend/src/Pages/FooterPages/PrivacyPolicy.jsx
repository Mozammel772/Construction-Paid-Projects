import { motion } from "framer-motion";
import { Cookie, FileLock, Info, LockKeyhole, Phone, RefreshCcw, Share2, User } from "lucide-react";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

// Animation variants
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const PrivacyPolicy = () => {
  return (
    <div>
      <Helmet>
        <title>AM DECO | Politique de confidentialité</title>
      </Helmet>

      <motion.div className="px-4 py-6 max-w-4xl mx-auto" variants={container} initial="hidden" animate="show">

        {/* Animated Title */}
        <motion.div variants={fadeInUp}>
          <TittleAnimation
            tittle="Politique de confidentialité – AM DECO"
            subtittle="Dernière mise à jour : Juillet 2025"
          />
        </motion.div>

        {/* Intro */}
        <motion.p className="text-lg mb-6 text-justify leading-relaxed" variants={fadeInUp}>
          📌 Responsable du traitement des données : <br/>
          AM DECO SARL <br/>
          56 rue du Parc des Rigouts, 77190 Dammarie-les-Lys, France <br/>
          SIREN : 879 775 625 <br/>
          Email : <a href="mailto:contact@amdeco-renovation.fr" className="text-blue-600 underline">contact@amdeco-renovation.fr</a>
        </motion.p>

        {/* Sections */}
        {[
          {
            icon: <User className="text-blue-600" />,
            title: "1. Informations que nous collectons",
            content: (
              <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                <li>Données de contact : nom, prénom, email, téléphone (via le formulaire de demande de devis ou la création de compte client)</li>
                <li>Informations liées aux projets : photos et commentaires déposés dans l’espace client</li>
                <li>Données de navigation : pages visitées, adresse IP, informations de session (via cookies techniques)</li>
              </ul>
            ),
          },
          {
            icon: <Info className="text-yellow-600" />,
            title: "2. Comment nous utilisons vos données",
            content: (
              <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                <li>Répondre aux demandes de devis et gérer les rendez-vous téléphoniques</li>
                <li>Créer et gérer les accès à l’espace client</li>
                <li>Permettre le dépôt et le suivi des réserves après travaux</li>
                <li>Planifier les interventions sur site en cas de défaut</li>
                <li>Améliorer la navigation sur le site et la qualité du service</li>
              </ul>
            ),
          },
          {
            icon: <Share2 className="text-orange-600" />,
            title: "3. Partage et divulgation des données",
            content: (
              <>
                <p className="mb-4 text-lg text-justify">
                  AM DECO ne vend ni ne loue vos données personnelles. Elles peuvent être partagées :
                </p>
                <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                  <li>Avec des prestataires techniques (ex. : hébergeur, outil de prise de rendez-vous)</li>
                  <li>Si la loi l’impose</li>
                  <li>En cas de nécessité pour la protection des droits d’AM DECO (ex. : fraude, sécurité)</li>
                </ul>
              </>
            ),
          },
          {
            icon: <Cookie className="text-pink-600" />,
            title: "4. Conservation des données",
            content: (
              <p className="mb-6 text-lg text-justify">
                Pour les prospects : jusqu’à 12 mois après la dernière interaction. <br/>
                Pour les clients : jusqu’à 3 ans après la fin du chantier. <br/>
                Ou plus longtemps si une obligation légale l’exige. <br/>
                Vous pouvez demander la suppression de vos données à tout moment par email.
              </p>
            ),
          },
          {
            icon: <FileLock className="text-red-600" />,
            title: "5. Vos droits",
            content: (
              <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                <li>Accès à vos données</li>
                <li>Rectification ou suppression de vos données</li>
                <li>Opposition ou limitation du traitement</li>
                <li>Portabilité de vos données</li>
                <li>Retrait de votre consentement</li>
                <li>Réclamation auprès de la CNIL (www.cnil.fr)</li>
                <li>Pour exercer vos droits : <a href="mailto:contact@amdeco-renovation.fr" className="text-blue-600 underline">contact@amdeco-renovation.fr</a></li>
              </ul>
            ),
          },
          {
            icon: <LockKeyhole className="text-purple-600" />,
            title: "6. Mesures de sécurité",
            content: (
              <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                <li>Hébergement sécurisé</li>
                <li>Accès restreint aux données</li>
                <li>Mots de passe chiffrés</li>
                <li>Surveillance régulière des accès</li>
              </ul>
            ),
          },
          {
            icon: <RefreshCcw className="text-indigo-600" />,
            title: "7. Transferts internationaux",
            content: (
              <p className="mb-6 text-lg text-justify">
                Les données sont hébergées dans l’Union Européenne. Aucun transfert hors UE/EEE n’est prévu.
                Si cela devait évoluer, AM DECO s’engage à respecter les garanties adéquates prévues par le RGPD.
              </p>
            ),
          },
          {
            icon: <Phone className="text-green-700" />,
            title: "8. Modifications de la politique & Nous contacter",
            content: (
              <>
                <p className="mb-2 text-lg">
                  Cette politique de confidentialité peut être modifiée à tout moment. En cas de changement important, nous informerons les utilisateurs via le site ou par email.
                </p>
                <p className="text-lg mb-10">
                  Pour toute question ou demande relative à la confidentialité : <br/>
                  📧 Email: <a href="mailto:contact@amdeco-renovation.fr" className="text-blue-600 underline">contact@amdeco-renovation.fr</a>
                </p>
              </>
            ),
          },
        ].map((section, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
              {section.icon} {section.title}
            </h2>
            {section.content}
          </motion.div>
        ))}

        <motion.p className="text-xl font-semibold text-blue-700 text-justify" variants={fadeInUp}>
          🔒 AM DECO respecte votre confiance — nous nous engageons à protéger vos données.
        </motion.p>

      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
