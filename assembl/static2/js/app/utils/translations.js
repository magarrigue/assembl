/* eslint max-len: "off", quotes: ["error", "double"] */
const Translations = {
  fr: {
    yes: "oui",
    no: "non",
    "Number of contributions": "Nombre de messages",
    "Number of users": "Nombre de contributeurs",
    cancel: "Annuler",
    validate: "Valider",
    delete: "Supprimer",
    accountDeleted: "Votre compte a été supprimé avec succès",
    deletedUser: "Compte utilisateur supprimé",
    chatframe: {
      title: "Fenêtre de discussion instantanée",
      tooltip: "Assemb'Bot"
    },
    introduction: "Introduction",
    conclusion: "Conclusion",
    redirectToV1:
      "Vous allez être redirigé vers la phase %{phaseName} dans quelques secondes. Assembl est en cours d'amélioration, veuillez nous excuser pour le changement d'interface. Si rien ne se produit, cliquez sur le bouton ci-dessous.",
    harvesting: {
      enableHarvestingMode: "Activer le mode attrapage",
      disableHarvestingMode: "Désactiver le mode attrapage",
      harvesting: "Attrapage",
      inProgress: "Attrapage en cours",
      validated: "Attrapage validé",
      now: "Maintenant",
      harvestingSuccess: "L'extrait a été mis à jour avec succès.",
      harvestingDeleted: "L'extrait a été supprimé avec succès.",
      deleteExtract: "Supprimer l'extrait attrapé",
      confirmDeleteExtract: "Etes-vous certain de vouloir supprimer cet extrait ?",
      validateExtract: "Extrait validé",
      editExtract: "Modifier l'extrait attrapé",
      nuggetExtract: "Pépiter l'extrait attrapé",
      qualifyExtract: "Qualifier l'extrait attrapé",
      move: "Déplacer",
      qualifyNature: "Qualifier par nature",
      qualifyAction: "Qualifier par action"
    },
    search: {
      reset: {
        clear_all: "Effacer tous les filtres"
      },
      facets: {
        view_more: "Voir plus",
        view_less: "Voir moins",
        view_all: "Voir tout"
      },
      NoHits: {
        NoResultsFound: "Aucun résultat trouvé pour {query}.",
        DidYouMean: "Rechercher pour {suggestion}.",
        SearchWithoutFilters: "Rechercher {query} sans filtres",
        NoResultsFoundDidYouMean: "Aucun résultat trouvé pour {query}. Vous vouliez peut-être {suggestion} ?"
      },
      hitstats: {
        results_found: "{hitCount} résultats trouvés"
      },
      pagination: {
        previous: "Précédent",
        next: "Suivant"
      },
      searchbox: {
        placeholder: "Rechercher"
      },
      datefilter: {
        from: "Du",
        to: "Au"
      },
      published_on: "Publié le",
      member_since: "Membre depuis le",
      by: "par",
      search_come_from_what_you_need_to_know: "Recherche effectuée dans la section \"à retenir\" de cette discussion",
      search_come_from_announcement: "Recherche effectuée dans la section \"consigne\" de cette discussion",
      collapse_search: "Fermer la recherche",
      Categories: "Catégories",
      All: "Tout",
      post: "Messages",
      idea: "Idées",
      user: "Participants",
      synthesis: "Synthèse",
      Messages: "Messages",
      Participants: "Participants",
      like: "J'aime",
      disagree: "Pas convaincu",
      dont_understand: "Pas tout compris",
      more_info: "SVP + d'infos",
      Nature: "Nature",
      taxonomy_nature: {
        issue: "Problématique",
        actionable_solution: "Solution actionnable",
        knowledge: "Connaissance",
        example: "Exemple",
        concept: "Concept",
        argument: "Argument",
        cognitive_bias: "Biais cognitif"
      },
      Action: "Action",
      taxonomy_action: {
        classify: "Ranger",
        make_generic: "Rendre plus générique",
        argument: "Argumenter",
        give_examples: "Donner des exemples",
        more_specific: "Rendre plus opérationnel",
        mix_match: "Croiser avec un autre extrait",
        display_multi_column: "Activer le multi-colonne",
        display_thread: "Activer le thread",
        display_tokens: "Activer le vote",
        display_open_questions: "Activer les questions ouvertes",
        display_bright_mirror: "Activer le Design Fiction"
      },
      Sort: "Trier",
      "By relevance": "Par pertinence",
      "Most recent first": "Du plus récent au plus ancien",
      "Oldest first": "Du plus ancien au plus récent",
      "Most popular messages": "Messages les plus populaires",
      "Less popular messages": "Messages les moins populaires",
      "Most controversial messages": "Messages les plus polémiques",
      "Most consensus messages": "Messages les plus consensuels",
      "Messages judged unclear": "Messages jugés peu clairs",
      "Participants having the most posted messages": "Participants ayant le plus grand nombre de messages",
      "Participants having the less posted messages": "Participants ayant le moins grand nombre de messages",
      "Participants pleased by their peers": "Participants plébiscités par leurs pairs",
      "Filter by date": "Filtrer par période",
      "My messages": "Mes messages",
      "Messages in response to my contributions": "Messages en réponse à mes contributions",
      "Creative participants": "Participants créatifs",
      "Reactive participants": "Participants réactifs",
      "Learning participants": "Participants apprenants"
    },
    resourcesCenter: {
      defaultHeaderTitle: "Centre de ressources en ligne",
      download: "Télécharger le document"
    },
    navbar: {
      home: "accueil",
      debate: "débat",
      resourcesCenter: "Ressources",
      community: "communauté",
      connection: "Connexion",
      profile: "Mon profil",
      logout: "Se déconnecter",
      administration: "Administration",
      syntheses: "Synthèses"
    },
    footer: {
      terms: "Conditions générales d'utilisation",
      legalNotice: "Mentions légales",
      socialMedias: "Suivez-nous sur"
    },
    login: {
      loginModalBody: "Vous devez être connecté pour participer.",
      loginModalFooter: "Connectez-vous",
      alreadyAccount: "Vous avez déjà un compte ?",
      loginWithSocialMedia: "Connexion via votre compte OKTA groupe",
      password: "Mot de passe",
      email: "Email",
      login: "Se connecter",
      forgotPwd: "Réinitialiser votre mot de passe",
      noAccount: "Vous n’avez pas de compte OKTA groupe?",
      signUp: "Créer un compte",
      username: "Email ou nom d'utilisateur",
      fullName: "Nom complet",
      password2: "Répéter le mot de passe",
      createAccount: "Créer un compte",
      send: "Envoyer",
      sendPwdConfirm: "Changement de mot de passe demandé",
      accountCreated: "Votre compte vient d'être créé",
      sendPwdMsg:
        "Nous vous avons envoyé un email avec un lien de connexion temporaire. Cliquez sur ce lien pour vous connecter et changer votre mot de passe. Si l'email n'est pas arrivé dans votre boîte de réception, veuillez vérifier dans vos spams.",
      resend: "Renvoyer l'email",
      accountCreatedMsg:
        "Un email de confirmation vient de vous être envoyé et devrait être dans votre boîte de réception dans quelques minutes. Il contient un lien de confirmation, veuillez cliquer dessus afin de confirmer votre adresse email. Si l'email n'est pas arrivé dans votre boîte de réception, veuillez vérifier dans vos spams.",
      changePassword: "Changez votre mot de passe",
      incorrectPassword: "Les mots de passe que vous avez écrits ne correspondent pas",
      somethingWentWrong: "Nous sommes desolés ! Quelque chose s'est mal passé. Veuillez ré-essayer",
      userName: "Nom d'utilisateur (optionnel)",
      passwordChangeRequestSuccess: "Super ! Un e-mail vous a été envoyé. Assurez-vous de vérifier également votre dossier spam",
      passwordChangeRequestError: "Oh oh ! Il semble y avoir un problème de notre côté. Veuillez réessayer plus tard",
      invalidEmail: "L’e-mail que vous avez renseigné est invalide",
      existingUsername: "Le nom d’utilisateur que vous avez renseigné existe déjà",
      existingEmail: "L’e-mail que vous avez renseigné existe déjà",
      emailNotFound: "L’e-mail que vous avez renseigné n’a pas été trouvé. Veuillez réessayer.",
      incorrectPasswordLogin:
        "Le mot de passe que vous avez entré ne correspond pas avec l’utilisateur saisi. Veuillez réessayer.",
      newPassword: "Nouveau mot de passe",
      newPassword2: "Ré-entrez le nouveau mot de passe"
    },
    changePassword: {
      panelTitle: "Bienvenue dans la page changement de mot de passe d'Assembl"
    },
    home: {
      accessButton: "Je participe",
      sentiments_0: "vote",
      sentiments_1: "vote",
      sentiments: "votes",
      contribution_0: "contribution",
      contribution_1: "contribution",
      contribution: "contributions",
      messages_0: "message",
      messages_1: "message",
      messages: "messages",
      participant_0: "participant",
      participant_1: "participant",
      participant: "participants",
      participations_0: "participation",
      participations_1: "participation",
      participations: "participations",
      visit: "visites",
      pageViews: "pages vues",
      sumVisitsLength: "temps passé global",
      partners: "Partenaires",
      themesTitle: "Les thématiques en cours",
      themesSubtitle: "Retrouvez vos discussions à la unes, des plus polémiques au plus plébiscitées",
      controversial: "Discussions polémiques",
      longerThread: "Thread le plus long",
      topContributor: "Top contributeur",
      recentDiscussion: "Discussion récente",
      objectivesTitle: "Pourquoi un tel débat ?",
      timelineTitle: "Les %{count} étapes de la concertation",
      video: "La vidéo du débat",
      twitterTitle: "Tweet",
      contact: "Besoin d'échanger au sujet de la plateforme ?",
      contactUs: "Contactez-nous",
      from_start_to_end: "du %{start} au %{end}",
      chatbot: "Chat avec %{chatbotName}",
      assemblNotConfigured: "La configuration d'Assembl n'est pas terminée"
    },
    multiColumns: {
      synthesis: {
        noSynthesisYet: "La synthèse est en cours de rédaction",
        title: "Synthèse : %{colName}"
      }
    },
    synthesis: {
      title: "synthèse",
      seeConversation: "Voir la conversation",
      noSynthesisYet: "Il n'y a pas encore de synthèse disponible.",
      tableOfContents: "Sommaire"
    },
    common: {
      attachFileForm: {
        label: "Insérer une pièce jointe",
        submit: "Valider"
      },
      attachments: {
        download: "Télécharger"
      },
      editor: {
        attachment: "Joindre un fichier",
        bold: "Gras",
        italic: "Italique",
        bulletList: "Liste de puces"
      },
      uploadButton: "Choisissez un fichier",
      goUp: "Remonter"
    },
    community: {
      panelTitle: "Bienvenue dans la communauté d'Assembl"
    },
    debate: {
      shareThematic: "Partagez cette thématique",
      votes: "Votes",
      vote: "Vote",
      answer: "Je réponds :",
      toAnswer: "Répondre",
      share: "Partager",
      sharePost: "Partager ce message",
      shareSynthesis: "Partager cette synthèse",
      copyLink: "Copier le lien dans le presse-papier",
      linkCopied: "Lien copié",
      subject: "Ecrivez le titre",
      insert: "Ecrivez votre message",
      post: "Poster",
      like: "J'aime",
      agree: "D'accord",
      agreeCount: "%{count} d'accord",
      disagree: "Pas d'accord",
      disagreeCount: "%{count} pas d'accord",
      dontUnderstand: "Pas tout compris",
      moreInfo: "SVP + d'infos",
      remaining_x_characters: "Il vous reste %{nbCharacters} caractères",
      deleteMessage: "Supprimer ce message",
      editMessage: "Modifier ce message",
      confirmDeletionTitle: "Confirmation de suppression",
      confirmDeletionBody: "Êtes-vous sûr de vouloir supprimer ce message ?",
      confirmDeletionButtonDelete: "Supprimer",
      confirmDeletionButtonCancel: "Annuler",
      whatYouNeedToKnow: "À retenir",
      syntheses: "Synthèses",
      survey: {
        themesTitle: "Choisissez une thématique !",
        txtAreaPh: "Ecrivez votre proposition",
        question_x_on_total: "Question %{current} sur %{total}",
        titleVideo: "Une vidéo pour mieux comprendre le sujet...",
        proposalsTitle: "Êtes-vous d'accord avec les propositions exprimées ?",
        reactions_0: "Réaction",
        reactions_1: "Réaction",
        reactions: "Réactions",
        react: "Réagissez :",
        moreProposals: "Voir plus de propositions",
        allProposals: "Voir toutes les propositions",
        noProposals: "Il n'y a pas de propositions. Soyez le premier à contribuer !",
        submit: "Envoyer",
        postSuccess: "Merci pour votre participation. Votre proposition a bien été envoyée !",
        endPhase: "La phase %{closedPhaseName} est terminée."
      },
      question: {
        backToQuestions: "Retour aux questions"
      },
      thread: {
        messageTranslatedFrom: "Ce message a été traduit du texte %{language}.",
        messageOriginallyIn: "Ce message a été rédigé en %{language}.",
        translateAllMessagesIn: "Je souhaite traduire tous les messages rédigés en %{language}.",
        translateOnlyThisMessage: "Je souhaite traduire ce message.",
        untranslateOnlyThisMessage: "Je souhaite afficher uniquement ce message dans sa langue originale",
        untranslateAllMessagesIn: "Je souhaite afficher tous les messages rédigés en %{language} dans leur langue originale.",
        chooseLanguagePh: "Veuillez choisir la langue",
        postDeletedByAdmin: "Ce message a été supprimé par l'administrateur.",
        postDeletedByUser: "Ce message a été supprimé par son auteur.",
        postEdited: "modifié",
        postSuccess: "Merci pour votre participation. Votre message a bien été envoyé !",
        fillSubject: "Veuillez écrire un titre",
        fillBody: "Veuillez écrire un message",
        linkIdea: "Ce post est en lien avec les thématiques suivantes :",
        foldedPostLink: "Voir les %{count} réponses",
        foldedPostLink_1: "Voir la réponse",
        noPostsInThread: "Soyez le premier à contribuer, démarrez une discussion !",
        numberOfResponses: "%{count} réponses à ce post",
        numberOfResponses_0: "Aucune réponse à ce post",
        numberOfResponses_1: "%{count} réponse à ce post",
        numberOfReactions: "%{count} réactions",
        numberOfReactions_1: "%{count} réaction",
        showOriginal: "Afficher dans sa langue originale",
        startDiscussion: "Je démarre une discussion",
        translate: "Traduire",
        goToIdea: "Voir tous les messages",
        seeSubIdeas: "Voir les %{count} sous-thèmes",
        seeSubIdeas_1: "Voir le sous-thème",
        announcement: "Consigne"
      },
      themes: "Thèmes",
      notStarted: "La phase %{phaseName} n'a pas encore commencé. Merci de revenir à partir du ",
      isCompleted: "Cette phase est terminée. Vous ne pouvez plus voter.",
      noAnswer: "Cette phase est terminée. Vous ne pouvez plus répondre.",
      edit: {
        title: "Je modifie mon message",
        subject: "Titre",
        body: "Message"
      },
      voteSession: {
        currentTokenDistribution: "Répartition actuelle des jetons",
        tokenDistribution: "Répartition des votes",
        estimate: "Estimation moyenne",
        isCompleted: "La phase de vote est désormais terminée. Nous vous remercions d'avoir participé !",
        voteResultsPlusTitle: "Résultats des votes : %{title}",
        noVoteSession: {
          title: "La session de vote n'est pas configurée",
          text: "Un administrateur doit configurer la session de vote"
        },
        postSuccess:
          "Merci pour votre participation ! Votre vote a bien été pris en compte. Vous pouvez le modifier à tout moment jusqu’à la fermeture de la session de vote.",
        remainingTokens: "Il vous reste %{count} jetons disponibles.",
        resetTokens: "Supprimer mon vote",
        submit: "Soumettre le vote",
        showVotesInProgress: "Ouvrir les votes de la communauté",
        showLess: "Fermer les votes de la communauté",
        participantsCount: "%{count} participants ont voté !",
        participantsCount_0: "Aucun participant n'a encore voté",
        participantsCount_1: "%{count} participant a voté",
        tokenTooltip: "%{count} jetons %{name}",
        notEnoughTokens: "Vous n'avez plus assez de jetons",
        exclusiveTokens: "Vous avez déjà voté pour une autre catégorie pour cette proposition",
        totalVotes: "%{count} votes",
        valueWithUnit: "%{num} %{unit}"
      }
    },
    profile: {
      panelTitle: "Votre compte",
      personalInfos: "Informations personnelles",
      userName: "Nom d'utilisateur",
      fullname: "Nom complet",
      email: "Email",
      oldPassword: "Mot de passe actuel",
      newPassword: "Nouveau mot de passe",
      newPassword2: "Retaper le mot de passe",
      memberSince: "Membre depuis le %{date}",
      save: "Enregistrer",
      password: "Mot de passe",
      changePassword: "Modifier mon mot de passe",
      passwordModifiedSuccess: "Votre mot de passe a été modifié avec succès",
      saveSuccess: "Votre profil a été mis à jour avec succès",
      deleteMyAccount: "Supprimer mon compte",
      deleteMyAccountConfirmation: "Supprimer mon compte et l'ensemble de mes données",
      deleteMyAccountText:
        "En supprimant votre compte, vous supprimez définitivement l'ensemble de vos données personnelles ainsi que votre compte. Vous ne pourrez plus contribuer à la consultation sans compte.",
      deleteMyAccountModal:
        "Êtes-vous certain de vouloir supprimer définitivement votre compte ainsi que l'ensemble de vos données personnelles ? En validant, vous ne pourrez plus contribuer à la consultation.",
      updateUser: {
        errorMessage: {
          "1": "Nous avons déjà un utilisateur ayant ce nom d'utilisateur.",
          "2": "Le mot de passe renseigné ne correspond pas à votre mot de passe actuel.",
          "3": "Vous avez entré deux mots de passe différents.",
          "4": "Le nouveau mot de passe doit être différent du mot de passe actuel.",
          "5": "Le nouveau mot de passe doit être différent des 5 derniers mots de passe que vous avez utilisés."
        }
      }
    },
    loading: {
      wait: "Veuillez patienter"
    },
    error: {
      reason: "Désolé, une erreur s'est produite :",
      required: "Ce champ est obligatoire.",
      loading: "Une erreur est survenue, veuillez recharger la page"
    },
    notFound: {
      panelTitle: "Désolé, cette page n'existe pas"
    },
    termsAndConditions: {
      headerTitle: "Conditions générales d'utilisation",
      iAccept: "J'ai lu et j'accepte les ",
      link: "conditions générales d'utilisation",
      accept: "J'accepte"
    },
    legalNotice: {
      headerTitle: "Mentions légales"
    },
    administration: {
      confirmTextFieldDeletionTitle: "Supprimer le champ",
      confirmTextFieldDeletion: "Êtes-vous certain de vouloir supprimer ce champ ?",
      confirmSelectFieldOptionDeletionTitle: "Supprimer cet item",
      confirmSelectFieldOptionDeletion: "Êtes-vous certain de vouloir supprimer cet item ?",
      addThematic: "Ajouter une thématique",
      addQuestion: "Ajouter une question",
      anErrorOccured:
        "Il y a eu une erreur lors de la sauvegarde, veuillez vérifier que vous avez bien renseigné tous les champs requis.",
      deleteThematic: "Supprimer la thématique",
      confirmDeleteThematicTitle: "Confirmer la suppression",
      confirmDeleteThematic: "Êtes-vous sûr de vouloir supprimer cette thématique ?",
      confirmUnsavedChanges: "Vous avez des changements non sauvegardés. Êtes-vous sûr de vouloir quitter cette page ?",
      deleteQuestion: "Supprimer la question",
      changeLanguage: "Renseigner une autre langue",
      question_label: "Question",
      announcementModule: "Option module consigne",
      thematic: "Thématique",
      deleteThematicImage: "Supprimer l'image associée à cette thématique",
      edition: "Éditer la discussion",
      landingpage: "Page d'accueil",
      up: "Remonter",
      down: "Descendre",
      nextStep: "Étape suivante",
      previousStep: "Étape précédente",
      menu: {
        phase: "Phase %{count} - %{description}",
        language: "Éditer la langue du débat",
        sections: "Éditer les rubriques du débat",
        legalNoticeAndTerms: "CGU & Mentions légales",
        exportTaxonomies: "Exporter les taxonomies",
        manageProfileOptions: "Options d'inscription"
      },
      noTimeline: "Aucune timeline n'a été configurée pour ce débat.",
      survey: {
        "0": "Renseigner les thématiques",
        "1": "Renseigner les questions",
        "2": "Exporter les données"
      },
      voteSession: {
        "0": "Configuration de la page",
        "1": "Configurer le ou les modules de vote",
        "2": "Configurer les propositions de vote",
        "3": "Exporter les données"
      },
      imageRequirements:
        "L'image doit avoir une hauteur de 480 px et une largeur de 1280 px. Le poids ne doit pas dépasser 1 Mo.",
      voteWithTokens: "Vote par jetons",
      voteWithGauges: "Vote par jauge(s)",
      gauge: "Jauge %{number}",
      token: "Jeton de type %{number}",
      tokenVoteCheckbox:
        "Le vote par jetons permet de sélectionner des propositions à la proportionnelle. Chaque participant dispose d'une certaine quantité de jetons et devra les répartir sur les propositions.",
      gaugeVoteCheckbox: "Vous pouvez choisir d'avoir une ou plusieurs jauges",
      tokenCategoryNumber: "Nombre de types de jetons",
      tokenNumber: "Nombre de jetons par personne",
      tokenTitle: "Intitulé du jeton",
      tokenColor: "Couleur du jeton",
      headerTitle: "Configuration du bandeau de haut de page",
      ProposalsSectionTitle: "Configuration du titre de la section Propositions",
      instructions: "Configuration de la section Consigne",
      voteSessionHeaderLabel: "Choisir l'image de fond du bandeau",
      voteSessionSuccess: "La session de vote a été enregistrée avec succès.",
      exclusive: "Exclusif",
      tokenVoteInstructions: "Consigne du vote par jetons",
      proposalsSectionTitle: "Configuration du titre de la section Propositions",
      voteModulesIntroText1: "Vous avez choisi le dispositif de vote.",
      voteModulesIntroText2: "Pour modifier votre choix, modifiez la ",
      timeline: "ligne de temps",
      notExclusive: "Non exclusif",
      voteProposals: {
        sectionTitle: "Configurer les propositions associées aux modules de vote",
        defineProposal: "Définir proposition %{number}",
        addProposal: "Ajouter une proposition",
        deleteProposal: "Supprimer la proposition",
        deleteModalTitle: "Confirmation de suppression",
        deleteModalBody: "Êtes-vous sûr de vouloir supprimer cette proposition ?",
        title: "Titre de la proposition",
        description: "Description",
        tokenVote: "Vote par jetons",
        gauge: "Jauge %{number}",
        customGauge: "Jauge %{number} (modifiée pour cette proposition)",
        gaugeSettings: "Modifier le paramétrage",
        edit: "Modifier",
        cancelCustomization: "Annuler le paramétrage",
        validationErrors: {
          atLeastOneModule: "Vous devez sélectionner au moins un module."
        }
      },
      gaugeModal: {
        title: "Modification des paramètres de jauge",
        subTitle:
          "Vous vous apprêtez à modifier les paramètres sur cette jauge uniquement. Si vous souhaitez répercuter ces paramètres à l'ensemble des jauges, veuillez cocher la case en bas de formulaire.",
        applyToAllProposalsCheckboxLabel: "Appliquer ces changements à l'ensemble des propositions"
      },
      gaugeVoteInstructions: "Consigne du vote par jauge",
      proposalSectionTitle: "Configuration du titre de la section",
      gaugeNumber: "Nombre de jauges",
      defineGaugeNumer: "Définissez le nombre de jauges",
      minValue: "Valeur minimale",
      maxValue: "Valeur maximale",
      unit: "Unité",
      saveFirstStep: "Veuillez d'abord revenir à l'étape 1 et sauvegarder la configuration de la page.",
      saveSecondStep: "Veuillez d'abord revenir à l'étape 2 et configurez puis sauvegardez les modules de vote.",
      configureVoteSession: "Vous devez configurer une session de vote.",
      configureVoteModules: "Vous devez avoir configuré au moins un module de vote.",
      backToPreviousStep: "Revenir à l'étape %{number}",
      nbTicksHelper: "Définissez le nombre de crans pour la jauge",
      nbTicks: "Nombre de crans",
      textValue: "Valeur textuelle",
      numberValue: "Valeur numéraire",
      valueTitle: "Intitulé de la valeur",
      seeCurrentVotes: "Voulez-vous que les participants puissent voir l'évolution des votes en cours ?",
      resultsVisible: "Oui, avant même d'avoir voté.",
      resultsNotVisible: "Non, n'afficher le résultat qu'une fois le vote clos.",
      sections: {
        addSection: "Ajouter une rubrique",
        deleteSection: "Supprimer la rubrique",
        homepage: "Accueil",
        custom: "Rubrique supplémentaire",
        externalPage: "Utiliser une page externe",
        titlePh: "Titre",
        urlPh: "URL",
        successSave: "Les rubriques ont été modifiées avec succès",
        sectionsTitle: "Renseigner les rubriques"
      },
      helpers: {
        voteSessionHeader: "Le bandeau de haut de page doit contenir une image et un titre. Le sous-titre est optionnel.",
        voteSessionInstructions:
          "La section consigne comporte un titre et une consigne qui permettent de guider les participants dans leur contribution.",
        voteSessionProposalSection:
          "La partie qui comporte les diverses propositions est introduite par un titre. À vous de définir le titre selon qu'il s'agisse de propositions, d'idées, de projets ou autre...",
        tokenCategoryNumber: "Sélectionnez le nombre de types de jetons différents souhaité pour ce vote",
        exclusive:
          "Vous pouvez décider si le participant peut distributer un seul type de jetons (exclusif) ou plusieurs types de jetons par proposition (non exclusif).",
        tokenVoteInstructions: "En fonction de l'objectif du module de jetons, incitez les participants à passer à l'action.",
        gaugeVoteInstructions: "En fonction de l'objectif du module jauge, incitez les participants à passer à l'action.",
        landingPage: {
          header:
            "Bandeau image en haut de la page. Il contient le titre de la consultation, et un sous-titre informatif, ainsi qu'un bouton d'accès à la consultation.",
          timeline:
            "La section timeline met en avant les différentes phases de la consultation ainsi que le niveau de progression dans le temps. Elle contient un titre, un sous-titre, et pour chaque phase, un descriptif et des images associées. Pour la configuration du débat en phases, revenir au menu Éditer la discussion.",
          tweets:
            "La section Tweets met en avant les tweets relatifs à la consulation. Vous devez renseigner le titre de la section tweet, le #tag de recherche, et une image pour le fond de la section.",
          chatbot:
            "Il s'agit d'un bandeau de redirection vers un module chatbot messenger dédié à la consultation. Vous devez renseigner le titre, l'url du chatbot messenger et l'intitulé du bouton de redirection.",
          news:
            "Permet de mettre en avant une ou plusieurs actualités en rapport avec la consultation (publication d'une nouvelle synthèse, création d'une nouvelle thématique, …) avec des liens de redirection.",
          introduction: " ",
          data: " ",
          footer: " ",
          video: " ",
          contact: " ",
          top_thematics: " ",
          partners: " "
        }
      },
      videoHelp:
        "*Liens vidéo autorisés : \"https://www.youtube.com/embed/[videoId]\" ou \"https://player.vimeo.com/video/[videoId]?\"",
      annotation: "Les champs * sont requis.",
      themeNum: "Thématique %{index}",
      discussion: {
        "0": "Langues utilisées",
        "3": "Options d'inscription",
        "4": "Conditions générales d'utilisation & mentions légales"
      },
      languageChoice: "Sélection des langues du débat",
      ph: {
        title: "*Titre",
        quote: "Citation",
        descriptionTop: "Texte au-dessus de la vidéo",
        descriptionBottom: "Texte en-dessous de la vidéo",
        mediaLink: "Lien média en ligne (vidéo, image, etc..)",
        orAttachPicture: "Ou téléchargez une image depuis votre ordinateur",
        headerTitle: "Titre du bandeau",
        headerSubtitle: "Sous-titre du bandeau",
        instructionsTitle: "Titre de la consigne",
        instructionsContent: "Contenu de la consigne",
        propositionSectionTitle: "Titre de la section"
      },
      resourcesCenter: {
        createResource: "Ajouter un média",
        menuTitle: "Éditer le centre de ressources",
        title: "Centre de ressources",
        editResourceFormTitle: "Média %{num}",
        textLabel: "Texte",
        titleLabel: "Titre",
        embedCodeLabel: "Vidéo/Slides",
        deleteResource: "Supprimer la ressource",
        documentLabel: "Document",
        imageLabel: "Image",
        successSave: "Les ressources ont été enregistrées avec succès !",
        pageTitleLabel: "Titre de la page",
        headerImageLabel: "Image de fond du bandeau"
      },
      export: {
        defaultAnnotation: "Vous pouvez exporter l'ensemble des données en cliquant sur le bouton exporter",
        surveyAnnotation:
          "Vous pouvez exporter l'ensemble des données du module de questions ouvertes en cliquant sur le bouton Exporter",
        voteSessionAnnotation: "Vous pouvez exporter l'ensemble des données du module de vote en cliquant sur le bouton Exporter",
        link: "Exporter",
        noExportLanguage: "Conserver les messages dans leurs langues d'origine",
        title: "Exporter les données du débat",
        sectionTitle: "Exporter les données",
        translateTheMessagesIn: "Traduire l'ensemble des messages en:"
      },
      step_x_total: "Section %{num} sur %{total}",
      saveThemes: "Sauvegarder",
      successThemeCreation: "Les thématiques ont été enregistrées avec succès !",
      successLanguagePreference: "Les langues du débat ont été enregistrées avec succès !",
      legalNoticeAndTerms: {
        legalNoticeLabel: "Mentions légales",
        termsAndConditionsLabel: "Conditions générales d'utilisation",
        successSave: "Les CGU et mentions légales ont été enregistrées avec succès !"
      },
      landingPage: {
        manageModules: {
          title: "Administrer les modules",
          helper: "Choisissez les modules que vous souhaitez voir apparaître dans la page d'accueil et leurs emplacements."
        },
        successSave: "Les modules ont été enregistrés avec succès !"
      },
      profileOptions: {
        addTextField: "Ajouter un champ",
        createNewFieldModalBody: "Choisissez le type de champ que vous souhaitez afficher dans le formulaire d'inscription :",
        choiceTextField: "Champ texte",
        choiceSelectField: "Menu déroulant",
        addSelectFieldOption: "Ajouter un nouvel item",
        deleteTextField: "Supprimer le champ",
        deleteSelectFieldOption: "Supprimer l'item",
        introText:
          "Configurez les champs que vous souhaitez afficher dans le formulaire d'inscription. Renseignez les noms ainsi que la mention obligatoire/non obligatoire.",
        textFieldToggleOptional: "Rendre ce champ optionnel",
        textFieldToggleRequired: "Rendre ce champ obligatoire",
        successSave: "Les options de profils ont été enregistrées avec succès !"
      }
    },
    unauthorizedAdministration: {
      unauthorizedMessage: "Vous n'êtes pas autorisé à accéder à l'administration. Veuillez contacter l'administrateur du site.",
      returnButton: "Retour à l'accueil"
    },
    date: {
      format: "D MMMM YYYY",
      format2: "DD-MM-YYYY"
    },
    duration: {
      format: "h [h]"
    }
  },
  en: {
    yes: "yes",
    no: "no",
    cancel: "Cancel",
    validate: "Validate",
    introduction: "Introduction",
    conclusion: "Conclusion",
    delete: "Delete",
    accountDeleted: "Your account has been successfully deleted",
    deletedUser: "Deleted user account",
    chatframe: {
      title: "Instant discussion window",
      tooltip: "Assemb'Bot"
    },
    redirectToV1:
      "You will be redirected to the %{phaseName} phase in a few seconds. Assembl is being improved, please excuse us for the interface change. If nothing happens, click on the button.",
    harvesting: {
      enableHarvestingMode: "Enable harvesting mode",
      disableHarvestingMode: "Disable harvesting mode",
      inProgress: "Harvesting in progress",
      validated: "Harvesting validated",
      now: "Now",
      harvesting: "Harvesting",
      harvestingSuccess: "The extract was updated successfully.",
      harvestingDeleted: "The extract was deleted successfully.",
      deleteExtract: "Delete the extract",
      confirmDeleteExtract: "Are you sure that you wish to delete this extract?",
      validateExtract: "Extract validated",
      editExtract: "Edit the extract",
      nuggetExtract: "Mark as nugget",
      qualifyExtract: "Qualify the extract",
      move: "Move",
      qualifyNature: "Qualify by nature",
      qualifyAction: "Qualify by action"
    },
    search: {
      reset: {
        clear_all: "Clear All Filters"
      },
      facets: {
        view_more: "View more",
        view_less: "View less",
        view_all: "View all"
      },
      NoHits: {
        NoResultsFound: "No results found for {query}.",
        DidYouMean: "Search for {suggestion}.",
        SearchWithoutFilters: "Search for {query} without filters",
        NoResultsFoundDidYouMean: "No results found for {query}. Did you mean {suggestion}?"
      },
      hitstats: {
        results_found: "{hitCount} results found"
      },
      pagination: {
        previous: "Previous",
        next: "Next"
      },
      searchbox: {
        placeholder: "Search"
      },
      datefilter: {
        from: "From",
        to: "To"
      },
      search_come_from_what_you_need_to_know: "Search done in the \"What you need to know\" section of this discussion",
      search_come_from_announcement: "Search done in the \"announcement\" section of this discussion",
      published_on: "Published on",
      member_since: "Member since",
      by: "by",
      collapse_search: "Close search",
      Categories: "Categories",
      All: "All",
      post: "Messages",
      idea: "Ideas",
      user: "Participants",
      synthesis: "Synthesis",
      Messages: "Messages",
      Participants: "Participants",
      like: "Like",
      disagree: "Disagree",
      dont_understand: "Did not get it",
      more_info: "More info please?",
      Nature: "Nature",
      taxonomy_nature: {
        issue: "Issue",
        actionable_solution: "Actionable solution",
        knowledge: "Knowledge",
        example: "Example",
        concept: "Concept",
        argument: "Argument",
        cognitive_bias: "Cognitive bias"
      },
      Action: "Action",
      taxonomy_action: {
        classify: "Classify",
        make_generic: "Make generic",
        argument: "Argument",
        give_examples: "Give examples",
        more_specific: "Be more specific",
        mix_match: "Mix & match",
        display_multi_column: "Display Multi-column",
        display_thread: "Display Thread",
        display_tokens: "Display tokens",
        display_open_questions: "Display Open questions",
        display_bright_mirror: "Display Design Fiction"
      },
      Sort: "Sort",
      "By relevance": "By relevance",
      "Most recent first": "More recent first",
      "Oldest first": "Oldest first",
      "Most popular messages": "Most popular messages",
      "Less popular messages": "Less popular messages",
      "Most controversial messages": "Most controversial messages",
      "Most consensus messages": "Most consensus messages",
      "Messages judged unclear": "Messages judged unclear",
      "Participants having the most posted messages": "Participants having the most posted messages",
      "Participants having the less posted messages": "Participants having the less posted messages",
      "Participants pleased by their peers": "Participants pleased by their peers",
      "Filter by date": "Filter by date",
      "My messages": "My messages",
      "Messages in response to my contributions": "Messages in response to my contributions",
      "Creative participants": "Creative participants",
      "Reactive participants": "Reactive participants",
      "Learning participants": "Learning participants"
    },
    resourcesCenter: {
      defaultHeaderTitle: "Online resources center",
      download: "Download the document"
    },
    navbar: {
      home: "home",
      debate: "debate",
      community: "community",
      resourcesCenter: "Resources",
      connection: "Login",
      profile: "My profile",
      logout: "Logout",
      administration: "Administration",
      syntheses: "Syntheses"
    },
    footer: {
      terms: "Terms & Conditions",
      legalNotice: "Legal Notice",
      socialMedias: "Follow us"
    },
    login: {
      loginModalBody: "You have to be connected to participate.",
      loginModalFooter: "Please connect",
      alreadyAccount: "Do you already have an account?",
      loginWithSocialMedia: "Connection with your OKTA group account?",
      password: "Password",
      email: "Email",
      login: "Log in",
      forgotPwd: "Reset your password",
      noAccount: "No OKTA group account yet?",
      signUp: "Sign up",
      username: "Email or user name",
      fullName: "Full name",
      password2: "Repeat password",
      createAccount: "Create an account",
      send: "Send",
      sendPwdConfirm: "Password change requested",
      accountCreated: "Your account has been created",
      sendPwdMsg:
        "We have sent you an email with a temporary connection link. Please use that link to log in and change your password. Make sure to check your spam folder if an email is not in your inbox",
      resend: "Resend the email",
      accountCreatedMsg:
        "A confirmation e-mail has been sent to your account and should be in your inbox in a few minutes. It contains a confirmation link, please click on it in order to confirm your e-mail address. Check your spam folder if you did not receive a confirmation e-mail.",
      changePassword: "Change Password",
      incorrectPassword: "The passwords that you have entered do not match",
      somethingWentWrong: "We are sorry! Something went terribly wrong. Please try again",
      userName: "Username (optional)",
      passwordChangeRequestSuccess: "Great! An email has been sent to your account. Make sure to check your spam folder as well",
      passwordChangeRequestError: "Oh oh! There seems to be a problem on our end. Please try again later.",
      invalidEmail: "The email you have entered is invalid",
      existingUsername: "The username you have entered already exists",
      existingEmail: "The email you have entered already exists",
      emailNotFound: "The email you have entered was not found. Please try again.",
      incorrectPasswordLogin: "The password you have entered does not match with the entered user. Please try again.",
      newPassword: "New password",
      newPassword2: "Re-enter new password"
    },
    changePassword: {
      panelTitle: "Welcome to Assembl forgot password page"
    },
    home: {
      accessButton: "I want to participate",
      sentiments_0: "vote",
      sentiments_1: "vote",
      sentiments: "votes",
      contribution_0: "contribution",
      contribution_1: "contribution",
      contribution: "contributions",
      messages_0: "message",
      messages_1: "message",
      messages: "messages",
      participant_0: "participant",
      participant_1: "participant",
      participant: "participants",
      participations_0: "participation",
      participations_1: "participation",
      participations: "participations",
      visit: "visits",
      pageViews: "page views",
      sumVisitsLength: "global time spent",
      partners: "Partners",
      themesTitle: "Ongoing themes",
      themesSubtitle: "Find your most controversial and highly acclaimed discussions on the front page",
      controversial: "Controversial discussions",
      longerThread: "Longer thread",
      topContributor: "Top contributor",
      recentDiscussion: "Recent discussion",
      objectivesTitle: "What is the objective?",
      timelineTitle: "The timeline in %{count} phases",
      video: "Video of the debate",
      twitterTitle: "Tweet",
      contact: "Do you wish to know more about this platform?",
      contactUs: "Contact us",
      from_start_to_end: "from %{start} to %{end}",
      chatbot: "Chat with %{chatbotName}",
      assemblNotConfigured: "Assembl has not been fully configured yet"
    },
    community: {
      panelTitle: "Welcome to Assembl community page"
    },
    common: {
      attachFileForm: {
        label: "Add an attachment",
        submit: "Submit"
      },
      attachments: {
        download: "Download"
      },
      editor: {
        attachment: "Add a file",
        bold: "Bold",
        italic: "Italic",
        bulletList: "Bullet list"
      },
      uploadButton: "Choose a file to upload",
      goUp: "Back to top"
    },
    multiColumns: {
      synthesis: {
        noSynthesisYet: "The synthesis is currently being written",
        title: "Synthesis: %{colName}"
      }
    },
    synthesis: {
      title: "synthesis",
      seeConversation: "See the conversation",
      noSynthesisYet: "There is no synthesis available yet.",
      tableOfContents: "Table of contents"
    },
    debate: {
      shareThematic: "Share this thematic",
      votes: "Votes",
      vote: "Vote",
      answer: "I answer:",
      toAnswer: "Answer",
      share: "Share",
      sharePost: "Share this message",
      shareSynthesis: "Share this synthesis",
      copyLink: "Copy the link to the clipboard",
      linkCopied: "Link copied",
      subject: "Write the title",
      insert: "Post a comment",
      post: "Post",
      like: "Like",
      agree: "Agree",
      agreeCount: "%{count} agree",
      disagree: "Disagree",
      disagreeCount: "%{count} disagree",
      dontUnderstand: "Did not get it",
      moreInfo: "More info please",
      remaining_x_characters: "You have %{nbCharacters} characters left",
      deleteMessage: "Delete this message",
      editMessage: "Edit this message",
      confirmDeletionTitle: "Confirm deletion",
      confirmDeletionBody: "Are you sure you want to delete this message?",
      confirmDeletionButtonDelete: "Delete",
      confirmDeletionButtonCancel: "Cancel",
      whatYouNeedToKnow: "What you need to know",
      syntheses: "Syntheses",
      survey: {
        themesTitle: "Choose a theme!",
        txtAreaPh: "Write your point of view",
        question_x_on_total: "Question %{current} on %{total}",
        titleVideo: "A video to better understand the subject...",
        proposalsTitle: "Do you agree with these points of view?",
        reactions_0: "Reaction",
        reactions_1: "Reaction",
        reactions: "Reactions",
        react: "React:",
        moreProposals: "More points of view",
        allProposals: "See all points of view",
        noProposals: "There is no point of view for the moment. Be the first to contribute!",
        submit: "Submit",
        postSuccess: "Thanks for your participation. Your proposal has been sent!",
        endPhase: "The %{closedPhaseName} phase is closed."
      },
      question: {
        backToQuestions: "Back to questions"
      },
      thread: {
        messageTranslatedFrom: "This message has been translated from %{language}.",
        messageOriginallyIn: "This message has been written in %{language}",
        translateAllMessagesIn: "Translate all messages posted in %{language}.",
        untranslateAllMessagesIn: "I don't want to translate all messages in %{language}.",
        translateOnlyThisMessage: "Translate only this message.",
        untranslateOnlyThisMessage: "I don't want to translate only this message",
        chooseLanguagePh: "Please choose the language",
        postDeletedByAdmin: "This message has been deleted by the community manager.",
        postDeletedByUser: "This message has been deleted by the author.",
        postEdited: "edited",
        postSuccess: "Thanks for your participation. Your comment has been sent!",
        fillSubject: "Please, write a title",
        fillBody: "Please, write a comment",
        linkIdea: "This post is related to the following themes:",
        foldedPostLink: "Show %{count} responses",
        foldedPostLink_1: "Show 1 response",
        noPostsInThread: "Be the first to contribute, start a discussion!",
        numberOfResponses: "%{count} responses to this post",
        numberOfResponses_0: "No response to this post",
        numberOfResponses_1: "%{count} response to this post",
        numberOfReactions: "%{count} reactions",
        numberOfReactions_1: "%{count} reaction",
        showOriginal: "Show original",
        startDiscussion: "Start a new thread",
        translate: "Translate",
        goToIdea: "View all messages",
        seeSubIdeas: "See %{count} sub-thematics",
        seeSubIdeas_1: "See sub-thematic",
        announcement: "Announcement"
      },
      themes: "Themes",
      notStarted: "The %{phaseName} phase has not started. Please come back from ",
      isCompleted: "This phase is closed. You can no longer vote.",
      noAnswer: "This phase is closed. You can no longer answer.",
      edit: {
        title: "I edit my message",
        subject: "Subject",
        body: "Comment"
      },
      voteSession: {
        currentTokenDistribution: "Current distribution of tokens",
        tokenDistribution: "Distribution of votes",
        estimate: "Average estimate",
        isCompleted: "This vote phase is closed. Thank you for your participation!",
        voteResultsPlusTitle: "Vote results: %{title}",
        noVoteSession: {
          title: "Vote session is not configured",
          text: "An administrator must configure the vote session"
        },
        postSuccess:
          "Thank you for your participation! Your vote has been set. You can modify this vote during the entire duration of the vote session.",
        remainingTokens: "You have %{count} tokens remaining.",
        resetTokens: "Reset my vote",
        submit: "Submit vote",
        showVotesInProgress: "Show votes of the community",
        showLess: "Close votes of the community",
        participantsCount: "%{count} participants voted!",
        participantsCount_0: "No participant voted yet",
        participantsCount_1: "%{count} participant voted",
        tokenTooltip: "%{count} %{name} tokens",
        notEnoughTokens: "You don't have enough tokens",
        exclusiveTokens: "You already voted for another category for this proposal",
        totalVotes: "%{count} votes",
        valueWithUnit: "%{unit}%{num}"
      }
    },
    profile: {
      panelTitle: "Your account",
      personalInfos: "Personal information",
      userName: "User name",
      fullname: "Full name",
      email: "Email",
      oldPassword: "Current password",
      newPassword: "New password",
      newPassword2: "Retype password",
      memberSince: "Member since %{date}",
      save: "Save",
      password: "Password",
      changePassword: "Change my password",
      passwordModifiedSuccess: "Your password has been changed with success",
      saveSuccess: "Your profile is updated",
      deleteMyAccount: "Delete my account",
      deleteMyAccountConfirmation: "Delete my account and my data",
      deleteMyAccountText:
        "By deleting your account, you permanently delete all of your personal data and your account. You will no longer be able to contribute to the debate without an account.",
      deleteMyAccountModal:
        "Are you sure you want to permanently delete your account and all of your personal data? By validating, you will no longer be able to contribute to the consultation.",
      updateUser: {
        errorMessage: {
          "1": "We already have a user with this username.",
          "2": "The entered password doesn't match your current password.",
          "3": "You entered two different passwords.",
          "4": "The new password has to be different than the current password.",
          "5": "The new password has to be different than the last 5 passwords you set."
        }
      }
    },
    loading: {
      wait: "Please wait..."
    },
    error: {
      reason: "Sorry, an error occurred:",
      required: "This field is required.",
      loading: "An error occurred, please reload the page"
    },
    notFound: {
      panelTitle: "Sorry, this page doesn't exist"
    },
    termsAndConditions: {
      headerTitle: "Terms & Conditions",
      link: "Terms & Conditions",
      iAccept: "I have read and I accept the ",
      accept: "I accept"
    },
    legalNotice: {
      headerTitle: "Legal Notice"
    },
    administration: {
      confirmTextFieldDeletionTitle: "Delete the field",
      confirmTextFieldDeletion: "Are you sure that you want to delete this field?",
      confirmSelectFieldOptionDeletionTitle: "Delete this item",
      confirmSelectFieldOptionDeletion: "Are you sure that you want to delete this item?",
      addThematic: "Add a theme",
      addQuestion: "Add a question",
      anErrorOccured: "An error occured during save. Please check that you filled all the required fields.",
      deleteThematic: "Delete the theme",
      confirmDeleteThematicTitle: "Confirm deletion",
      confirmDeleteThematic: "Are you sure you want to delete this theme?",
      confirmUnsavedChanges: "You have unsaved changes. Are you sure you want to leave this page?",
      deleteQuestion: "Delete the question",
      changeLanguage: "Set another language",
      question_label: "Question",
      announcementModule: "Announcement module",
      thematic: "Theme",
      deleteThematicImage: "Delete the image associated to this thematic",
      edition: "Edit the discussion",
      landingpage: "Landing page",
      up: "Up",
      down: "Down",
      nextStep: "Next step",
      previousStep: "Previous step",
      menu: {
        phase: "Phase %{count} - %{description}",
        language: "Discussion language",
        sections: "Edit debate sections",
        legalNoticeAndTerms: "T&C and legal notice",
        exportTaxonomies: "Export taxonomies",
        manageProfileOptions: "Registration options"
      },
      noTimeline: "No timeline has been configured yet",
      survey: {
        "0": "Set themes",
        "1": "Set questions",
        "2": "Export data"
      },
      voteSession: {
        "0": "Page configuration",
        "1": "Configure the voting modules",
        "2": "Configure the voting proposals",
        "3": "Export data"
      },
      imageRequirements: "The image must have a height of 480 px and a width of 1280px. Its size has to be under 1 MB.",
      voteWithTokens: "Tokens vote",
      voteWithGauges: "Gauge(s) vote",
      gauge: "Gauge %{number}",
      token: "Token %{number}",
      tokenVoteCheckbox:
        "The token vote module allows you to select propositions proportionnaly. Each participant has a certain amount of tokens et will have to spread them on the different propositions",
      gaugeVoteCheckbox: "You can choose to have one or several gages",
      headerTitle: "Top page Header configuration",
      propositionSectionTitle: "Proposals section title configuration",
      instructions: "Instructions section configuration",
      voteSessionHeaderLabel: "Choose the header background image",
      voteSessionSuccess: "The vote session is saved with success.",
      exclusive: "Exclusive",
      tokenVoteInstructions: "Instructions for the token vote",
      gaugeVoteInstructions: "Instructions for the gauge vote",
      proposalSectionTitle: "Proposal section title configuration",
      voteModulesIntroText1: "You chose the vote module",
      voteModulesIntroText2: "To modify your choice, modify the ",
      timeline: "timeline",
      gaugeNumber: "Gauge number",
      defineGaugeNumer: "Define gauges number",
      minValue: "Minimum value",
      maxValue: "Maximum value",
      unit: "Unit",
      configureVoteSession: "You need to configure a vote session.",
      configureVoteModules: "You need to configure at least one vote module.",
      saveFirstStep: "Please return to step 1 and save the instructions first.",
      saveSecondStep: "Please return to step 2 and configure and save the vote modules.",
      backToPreviousStep: "Return to step %{number}",
      nbTicksHelper: "Define ticks number for the gauge",
      nbTicks: "Ticks number",
      textValue: "Textual value",
      valueTitle: "Value title",
      numberValue: "Number value",
      tokenCategoryNumber: "Number of token types",
      tokenNumber: "Number of tokens per participant",
      tokenTitle: "Token title",
      tokenColor: "Color of the token",
      notExclusive: "Not exclusive",
      voteProposals: {
        sectionTitle: "Configure the proposals associated to the vote modules",
        gauge: "Gauge %{number}",
        customGauge: "Gauge %{number} (customized for this proposal)",
        defineProposal: "Define proposal %{number}",
        addProposal: "Add a proposal",
        deleteProposal: "Delete this proposal",
        deleteModalTitle: "Confirm deletion",
        deleteModalBody: "Are you sure you want to delete this proposal?",
        title: "Title of the proposal",
        description: "Description",
        tokenVote: "Token vote",
        gaugeSettings: "Edit settings",
        cancelCustomization: "Cancel settings",
        validationErrors: {
          atLeastOneModule: "You should select at least one module."
        }
      },
      gaugeModal: {
        title: "Modification of the gauge's settings",
        subTitle:
          "You are about to modify the settings on this gauge only. If you wish to modify all of the gauges, please check the box at the end of the form.",
        applyToAllProposalsCheckboxLabel: "Apply these changes to all of the proposals"
      },
      seeCurrentVotes: "Do you want participants to see the evolution of the votes in progress?",
      resultsVisible: "Yes, even before having voted.",
      resultsNotVisible: "No, only show the results once the vote is closed.",
      sections: {
        addSection: "Add a section",
        deleteSection: "Delete the section",
        resources_center: "Resources center",
        custom: "Added section",
        externalPage: "Use external page",
        titlePh: "Title",
        urlPh: "URL",
        successSave: "Sections are modified with success",
        sectionsTitle: "Set sections"
      },
      helpers: {
        voteSessionHeader: "The top page header must contain an image and a title. The subtitle is optional.",
        voteSessionInstructions:
          "The instructions section must contain a title and a description that will guide the participants for their contribution.",
        voteSessionProposalSection:
          "The proposals section is introduced by a title. You define the title based on the proposal content.",
        tokenCategoryNumber: "Select the number of different token types for this vote",
        exclusive:
          "You can decide wether the participant can distribute a single type of token (exclusive) or several types of token per proposal.",
        tokenVoteInstructions: "Depending on the objective of the token module, incite the participants to take action.",
        gaugeVoteInstructions: "Depending on the objective of the gauge module, incite the participants to take action.",
        landingPage: {
          header:
            "Top page header. It contains the consultation's title and subtitle and a button to access to the consultation.",
          timeline: " ",
          tweets: " ",
          chatbot: " ",
          news: " ",
          introduction: " ",
          data: " ",
          footer: " ",
          video: " ",
          contact: " ",
          top_thematics: " ",
          partners: " "
        }
      },
      videoHelp:
        "*Authorized video links: \"https://www.youtube.com/embed/[videoId]\" or \"https://player.vimeo.com/video/[videoId]?\"",
      annotation: "* Fields are required.",
      themeNum: "Theme %{index}",
      discussion: {
        "0": "Languages of the Discussion",
        "3": "Registration options",
        "4": "Terms & Conditions and Legal Notice"
      },
      languageChoice: "Select desired languages below",
      ph: {
        title: "*Title",
        quote: "Quote",
        descriptionTop: "Comments above video",
        descriptionBottom: "Comments below video",
        mediaLink: "Online media link (video, picture, etc..)",
        orAttachPicture: "Or upload an image from your computer",
        headerTitle: "Header title",
        headerSubtitle: "Header subtitle",
        instructionsTitle: "Instructions title",
        instructionsContent: "Instructions content",
        propositionSectionTitle: "Section title"
      },
      resourcesCenter: {
        createResource: "Add a media",
        menuTitle: "Edit the resources center",
        title: "Resources center",
        editResourceFormTitle: "Edit resource number %{num}",
        textLabel: "Text",
        titleLabel: "Title",
        embedCodeLabel: "Video/Slides",
        deleteResource: "Delete the resource",
        documentLabel: "Document",
        imageLabel: "Image",
        successSave: "Resources have been saved with success!",
        pageTitleLabel: "Page title",
        headerImageLabel: "Header image"
      },
      export: {
        defaultAnnotation: "You can export all of the data by clicking on the export button",
        surveyAnnotation: "You can export all the survey module data by clicking on the Export button",
        voteSessionAnnotation: "You can export all the vote session data by clicking on the Export button",
        link: "Export",
        noExportLanguage: "Keep the messages in their original languages",
        title: "Export the debate data",
        sectionTitle: "Export data",
        translateTheMessagesIn: "Translate the messages in:"
      },
      step_x_total: "Section %{num} on %{total}",
      saveThemes: "Save",
      successThemeCreation: "Themes have been saved with success!",
      successLanguagePreference: "Discussion language preferences have been saved with success!",
      legalNoticeAndTerms: {
        legalNoticeLabel: "Legal notice",
        termsAndConditionsLabel: "Terms and conditions",
        successSave: "The T&C and legal notice have been saved with success!"
      },
      landingPage: {
        manageModules: {
          title: "Manage the modules",
          helper: "Choose the modules you want to see in the landing page and their position."
        },
        successSave: "The modules have been saved with success!"
      },
      profileOptions: {
        addTextField: "Add a field",
        createNewFieldModalBody: "Select the field type you want to add to the register page:",
        choiceTextField: "Text field",
        choiceSelectField: "Dropdown field",
        addSelectFieldOption: "Add a new item",
        deleteTextField: "Delete the field",
        deleteSelectFieldOption: "Delete this item",
        introText:
          "Configure the fields that you want to display in the registration form. Fill in the names and whether the fields are required or optional.",
        textFieldToggleOptional: "Make this field optional",
        textFieldToggleRequired: "Make this field required",
        successSave: "The profile options has been saved with success!"
      }
    },
    unauthorizedAdministration: {
      unauthorizedMessage:
        "You are not authorized to access the administration section. Please contact the administrator of the website.",
      returnButton: "Back to home"
    },
    date: {
      format: "MMMM Do, YYYY",
      format2: "YYYY-MM-DD"
    },
    duration: {
      format: "h [h]"
    }
  }
};

module.exports = Translations; // keep commonJS syntax for the node i18n:export script to work