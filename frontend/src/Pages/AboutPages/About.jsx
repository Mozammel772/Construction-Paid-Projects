import { motion } from "framer-motion";
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

const About = () => {
  return (
    <>
      <Helmet>
        <title>AM DECO | À propos de nous</title>
      </Helmet>

      <div className="px-2 py-5">
        {/* Titre de la section */}
        <TittleAnimation
          tittle="À propos de nous – AM DECO"
          subtittle="Qui sommes-nous ?"
        />

        {/* Contenu de la section */}
        <motion.div
          className="mb-6 text-lg text-justify space-y-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <p>
            Créée en 2019, AM DECO est une entreprise de rénovation basée en Île-de-France, spécialisée dans le second œuvre et le tout corps d’état.
          </p>
          <p>
            Nous transformons vos espaces de vie ou de travail en lieux confortables, modernes et durables, en intervenant aussi bien sur de petits travaux que sur des projets de rénovation complète.
          </p>
          <p>Nos services couvrent notamment :</p>
          <ul className="list-disc ml-8 space-y-1">
            <li>Peinture & décoration (intérieure et extérieure)</li>
            <li>Revêtements de sols (carrelage, parquet, stratifié)</li>
            <li>Plâtrerie & isolation</li>
            <li>Rénovation de salles de bain et cuisines</li>
            <li>Aménagements et réagencements intérieurs sur mesure</li>
          </ul>
          <p>
            <strong>Notre vision & nos valeurs :</strong><br />
            Chez AM DECO, nous croyons que la rénovation ne se limite pas à la technique : elle repose avant tout sur la confiance, la transparence et le savoir-faire humain.
          </p>
          <p>
            Notre vision est claire :
            <br />✨ Réaliser des travaux de qualité qui durent
            <br />✨ Assurer un suivi clair et transparent à chaque étape
            <br />✨ Placer la satisfaction de nos clients au cœur de chaque projet
          </p>
          <p>
            <strong>Pourquoi nous choisir ?</strong><br />
            Une entreprise solide et déclarée, avec toutes les garanties professionnelles nécessaires. Une équipe polyvalente et expérimentée, dirigée par Mazen Boubaker, intervenant sur des chantiers en second œuvre comme en tout corps d’état.
          </p>
          <p>
            <strong>Un service innovant orienté client :</strong>
            <ul className="list-disc ml-8 space-y-1">
              <li>Suivi de chantier en ligne</li>
              <li>Déclaration des éventuels défauts directement via un espace personnel</li>
              <li>Prise de rendez-vous rapide pour corrections, couvertes par la garantie de parfait achèvement</li>
            </ul>
          </p>
          <p>
            <strong>Notre engagement :</strong><br />
            Qu’il s’agisse d’un projet simple ou complexe, nous nous engageons à la même exigence de qualité. Avec AM DECO, vous avez l’assurance d’un travail bien fait, d’un suivi transparent et d’une relation de confiance sur le long terme.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default About;
