import { motion } from "framer-motion";
import { CookieIcon, FileText, Info, ShieldCheck } from "lucide-react";
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

const CookiesPolicy = () => {
  return (
    <>
      <Helmet>
        <title>AM DECO | Politique relative aux cookies</title>
      </Helmet>

      <div className="px-2 py-5">
        <TittleAnimation
          tittle="🍪 Politique relative aux cookies – AM DECO"
          subtittle="Dernière mise à jour : Juillet 2025"
        />

        <motion.p className="mb-6 text-lg text-justify" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
          📌 À propos des cookies : Un cookie est un petit fichier texte stocké sur votre terminal (ordinateur, smartphone, etc.) lors de la consultation d’un site internet. Les cookies permettent à un site de fonctionner correctement, de se souvenir de vos préférences, et d’améliorer votre expérience utilisateur.
        </motion.p>

        {[
          {
            icon: <ShieldCheck className="text-green-600" />,
            title: "1. Comment nous utilisons les cookies",
            content: (
              <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                <li>Garantir le bon fonctionnement du site</li>
                <li>Assurer la sécurité et la stabilité technique</li>
                <li>Se souvenir des préférences de navigation</li>
                <li>Faciliter l’accès à certaines fonctionnalités de l’espace client</li>
                <li>Analyser la fréquentation du site (de manière anonyme)</li>
              </ul>
            ),
          },
          {
            icon: <CookieIcon className="text-orange-600" />,
            title: "2. Types de cookies utilisés",
            content: (
              <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                <li>🍪 <strong>Cookies essentiels</strong> : Indispensables pour utiliser le site et accéder aux fonctionnalités principales (authentification, sécurité, formulaire, navigation fluide). Ces cookies ne peuvent pas être désactivés.</li>
                <li>⚙️ <strong>Cookies fonctionnels</strong> : Utilisés pour enregistrer vos préférences (langue, type d’utilisateur, choix de rendez-vous). Ils peuvent être désactivés via les paramètres de votre navigateur.</li>
                <li>📊 <strong>Cookies analytiques</strong> : Permettent de mesurer l’audience du site, les pages visitées, le temps passé, etc., afin d’améliorer les contenus et l’expérience utilisateur. Ces données sont anonymisées et utilisées à des fins statistiques uniquement.</li>
              </ul>
            ),
          },
          {
            icon: <FileText className="text-purple-600" />,
            title: "3. Cookies tiers",
            content: (
              <p className="mb-6 text-lg text-justify">
                Nous pouvons utiliser des services tiers (comme Google Analytics) qui déposent leurs propres cookies. Ces cookies sont soumis aux politiques de confidentialité de ces services.
              </p>
            ),
          },
          {
            icon: <Info className="text-blue-600" />,
            title: "4. Gestion des cookies",
            content: (
              <p className="mb-6 text-lg text-justify">
                Vous pouvez contrôler les cookies via les paramètres de votre navigateur : supprimer ou bloquer certains ou tous les cookies, accepter ou refuser les cookies par catégorie, définir des préférences spécifiques par site. 👉 Attention : désactiver certains cookies (notamment essentiels) peut affecter la qualité de votre navigation et le bon fonctionnement du site.
              </p>
            ),
          },
          {
            icon: <ShieldCheck className="text-green-600" />,
            title: "5. Modifications de cette politique",
            content: (
              <p className="mb-6 text-lg text-justify">
                Cette politique peut être mise à jour à tout moment pour refléter l’évolution des services ou de la réglementation. Les modifications significatives seront indiquées sur le site.
              </p>
            ),
          },
          {
            icon: <CookieIcon className="text-orange-600" />,
            title: "6. Nous contacter",
            content: (
              <p className="mb-6 text-lg text-justify">
                Pour toute question relative à l’utilisation des cookies sur le site AM DECO : <a href="mailto:contact@amdeco-renovation.fr" className="text-blue-600 underline">contact@amdeco-renovation.fr</a>
              </p>
            ),
          },
        ].map((section, index) => (
          <motion.div key={index} variants={fadeUp} initial="hidden" animate="visible" custom={index + 2}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              {section.icon} {section.title}
            </h2>
            {section.content}
          </motion.div>
        ))}

        <motion.p className="text-xl font-semibold text-emerald-700 mt-10 text-justify" variants={fadeUp} initial="hidden" animate="visible" custom={20}>
          🍪 Merci de faire confiance à AM DECO. Pour toute question sur l’utilisation des cookies, veuillez nous contacter.
        </motion.p>
      </div>
    </>
  );
};

export default CookiesPolicy;
