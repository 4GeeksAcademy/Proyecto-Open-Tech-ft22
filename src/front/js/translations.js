import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          //NAVBAR
          "Submit Salary": "Submit Salary",
          "Sign out": "Sign out",

          //ROLE CARDS
          "Entries": "Entries",
          "Average": "Average",
          "Frontend Developer": "Frontend Developer",
          "Backend Developer": "Backend Developer",
          "Full-stack Developer": "Full-stack Developer",
          "Mobile App Developer": "Mobile App Developer",
          "DevOps Engineer": "DevOps Engineer",
          "Software Architect": "Software Architect",
          "UI/UX Designer": "UI/UX Designer",
          "Software Engineer in Test": "Software Engineer in Test",
          "Game Developer": "Game Developer",
          "Embedded Systems Developer": "Embedded Systems Developer",
          "Information Security Analyst": "Information Security Analyst",
          "Ethical Hacker": "Ethical Hacker",
          "Security Consultant": "Security Consultant",
          "Security Engineer": "Security Engineer",
          "Chief Information Security Officer": "Chief Information Security Officer",
          "Security Operations Center Analyst": "Security Operations Center Analyst",
          "Cryptographer": "Cryptographer",
          "Incident Responder": "Incident Responder",
          "Security Software Developer": "Security Software Developer",
          "Cybersecurity Researcher": "Cybersecurity Researcher",
          "Data Scientist": "Data Scientist",
          "Data Analyst": "Data Analyst",
          "Machine Learning Engineer": "Machine Learning Engineer",
          "Business Intelligence Analyst": "Business Intelligence Analyst",
          "Data Engineer": "Data Engineer",
          "Statistician": "Statistician",
          "Quantitative Analyst": "Quantitative Analyst",
          "Operations Analyst": "Operations Analyst",
          "Big Data Engineer": "Big Data Engineer",
          "Data Visualization Specialist": "Data Visualization Specialist",
          "Network Administrator": "Network Administrator",
          "Systems Administrator": "Systems Administrator",
          "Network Engineer": "Network Engineer",
          "Systems Engineer": "Systems Engineer",
          "Cloud Administrator": "Cloud Administrator",
          "IT Support Specialist": "IT Support Specialist",
          "Database Administrator": "Database Administrator",
          "Virtualization Engineer": "Virtualization Engineer",
          "Wireless Engineer": "Wireless Engineer",
          "IT Security Administrator": "IT Security Administrator",
          "Project Manager": "Project Manager",
          "Scrum Master": "Scrum Master",
          "Product Owner": "Product Owner",
          "IT Program Manager": "IT Program Manager",
          "Agile Coach": "Agile Coach",
          "Business Analyst": "Business Analyst",
          "Release Manager": "Release Manager",
          "Quality Assurance Manager": "Quality Assurance Manager",
          "IT Service Manager": "IT Service Manager",
          "Change Management Specialist": "Change Management Specialist",

          //CATEGORY
          "Your category selection": "Your category selection",

          //GRAPH
          "Role VS Entries": "Role VS Entries",

          //MAP
          "Entries by country": "Entries by country",

          //PSEUDO NAVBAR
          "Go back home": "Go back home",
          "Admin Button": "Admin Button",
          "Unlocking IT salaries, Embracing Transparency in Tech Careers.": "Unlocking IT salaries, Embracing Transparency in Tech Careers.",

          //HOME
          "Providing transparency in IT salaries empowers professionals to make informed decisions about their career paths. Users can compare their salaries with industry standards, helping them negotiate better compensation packages and make strategic career choices.": "Providing transparency in IT salaries empowers professionals to make informed decisions about their career paths. Users can compare their salaries with industry standards, helping them negotiate better compensation packages and make strategic career choices.",
          "The platform allows users to benchmark their salaries against others in the same industry or role. This valuable data enables individuals to gauge their position in the job market, understand salary trends, and identify opportunities for career growth.": "The platform allows users to benchmark their salaries against others in the same industry or role. This valuable data enables individuals to gauge their position in the job market, understand salary trends, and identify opportunities for career growth.",
          "By openly sharing salary information, the platform contributes to fostering fair compensation practices. It helps highlight discrepancies and encourages employers to maintain competitive salary structures, creating a more equitable and just work environment for IT professionals.": "By openly sharing salary information, the platform contributes to fostering fair compensation practices. It helps highlight discrepancies and encourages employers to maintain competitive salary structures, creating a more equitable and just work environment for IT professionals.",
          "The platform cultivates a sense of community among IT professionals by providing a space for users to anonymously share their compensation details. This one-way sharing of salary data allows users to gain insights into industry compensation trends and make informed decisions about their careers.": "The platform cultivates a sense of community among IT professionals by providing a space for users to anonymously share their compensation details. This one-way sharing of salary data allows users to gain insights into industry compensation trends and make informed decisions about their careers.",

          //welcome
          "Welcome": "Welcome",
          "Go to Salaries": "Go to Salaries",

          //Spect Pages
          //TABLA
          "Years of experience": "Years of experience",
          "Role Name": "Role Name",
          "Category": "Category",
          "City": "City",
          "Country": "Country",
          "Amount": "Amount",
          "Verified": "Verified",

          //GRAPHS
          "Experience VS Salary": "Experience VS Salary",
          "Country VS Average": "Country VS Average",
          "Go back to the main page": "Go back to the main page",

          //ADMIN
          "Pending": "Pending",
          "To be Verified": "To be Verified",
          "view PDF": "view PDF",
          "Selected PDF": "Selected PDF",
          "Please select a PDF from the table by clicking on the": "Please select a PDF from the table by clicking on the",
          "Verification date": "Verification date",
          "Previous": "Previous",
          "Next": "Next",
          "Verify PDF": "Verify PDF",
          "Reject PDF": "Reject PDF",

          //MODAL
          "PDF verification": "PDF verification",
          "Are you sure you want to verify this PDF?": "Are you sure you want to verify this PDF?",
          "A verification email will be sent to the user.": "A verification email will be sent to the user.",
          "Cancel": "Cancel",
          "Verify": "Verify",
          "PDF rejection": "PDF rejection",
          "Are you sure you want to reject this PDF?": "Are you sure you want to reject this PDF?",
          "A rejection email will be sent to the user.": "A rejection email will be sent to the user.",
          "Reject": "Reject",

          //SALARY FORM SUBMISSION
          "Submit information": "Submit information",
          "IT category": "IT category",
          "Select a category": "Select a category",
          "Software Development": "Software Development",
          "Cybersecurity": "Cybersecurity",
          "Data Science and Analytics": "Data Science and Analytics",
          "Network and Systems Administration": "Network and Systems Administration",
          "IT Project Management": "IT Project Management",
          "Specific role": "Specific role",
          "Select a role": "Select a role",
          "Select a country": "Select a country",
          "Annual salary in USD": "Annual salary in USD",
          "Upload Salary optional": "Upload Salary optional",
          "Select a city": "Select a city",
          "Submit": "Submit",
          "Go back Home": "Go back Home",

          //LOGIN
          "Username": "Username",
          "Password": "Password",
          "Sign in": "Sign in",
          "Sign up": "Sign up",
          "Don\'t have an account yet?'": "Don\'t have an account yet?",

          //REGISTER
          "Registration": "Registration",
          "Name": "Name",
          "Confirm Password": "Confirm Password",
          "Already have an account with us?": "Already have an account with us?",
        }
      },
      es: {
        translation: {
          //NAVBAR
          "Submit Salary": "Subir Liquidación",
          "Sign out": "Cerrar sesión",

          //ROLE CARDS
          "Entries": "Entradas",
          "Average": "Promedio",
          "Frontend Developer": "Desarrollador Frontend",
          "Backend Developer": "Desarrollador Backend",
          "Full-stack Developer": "Desarrollador Full-stack",
          "Mobile App Developer": "Desarrollador de Aplicaciones Móviles",
          "DevOps Engineer": "Ingeniero DevOps",
          "Software Architect": "Arquitecto de Software",
          "UI/UX Designer": "Diseñador UI/UX",
          "Software Engineer in Test": "Ingeniero de Pruebas de Software",
          "Game Developer": "Desarrollador de Juegos",
          "Embedded Systems Developer": "Desarrollador de Sistemas Embebidos",
          "Information Security Analyst": "Analista de Seguridad de la Información",
          "Ethical Hacker": "Hacker Ético",
          "Security Consultant": "Consultor de Seguridad",
          "Security Engineer": "Ingeniero de Seguridad",
          "Chief Information Security Officer": "Oficial Principal de Seguridad de la Información",
          "Security Operations Center Analyst": "Analista de Centro de Operaciones de Seguridad",
          "Cryptographer": "Criptógrafo",
          "Incident Responder": "Respondedor de Incidentes",
          "Security Software Developer": "Desarrollador de Software de Seguridad",
          "Cybersecurity Researcher": "Investigador de Ciberseguridad",
          "Data Scientist": "Científico de Datos",
          "Data Analyst": "Analista de Datos",
          "Machine Learning Engineer": "Ingeniero de Aprendizaje Automático",
          "Business Intelligence Analyst": "Analista de Inteligencia de Negocios",
          "Data Engineer": "Ingeniero de Datos",
          "Statistician": "Estadístico",
          "Quantitative Analyst": "Analista Cuantitativo",
          "Operations Analyst": "Analista de Operaciones",
          "Big Data Engineer": "Ingeniero de Big Data",
          "Data Visualization Specialist": "Especialista en Visualización de Datos",
          "Network Administrator": "Administrador de Redes",
          "Systems Administrator": "Administrador de Sistemas",
          "Network Engineer": "Ingeniero de Redes",
          "Systems Engineer": "Ingeniero de Sistemas",
          "Cloud Administrator": "Administrador de la Nube",
          "IT Support Specialist": "Especialista en Soporte de TI",
          "Database Administrator": "Administrador de Bases de Datos",
          "Virtualization Engineer": "Ingeniero de Virtualización",
          "Wireless Engineer": "Ingeniero de Redes Inalámbricas",
          "IT Security Administrator": "Administrador de Seguridad de TI",
          "Project Manager": "Gerente de Proyectos",
          "Scrum Master": "Scrum Master",
          "Product Owner": "Dueño del Producto",
          "IT Program Manager": "Gerente de Programa de TI",
          "Agile Coach": "Coach Ágil",
          "Business Analyst": "Analista de Negocios",
          "Release Manager": "Gerente de Liberación",
          "Quality Assurance Manager": "Gerente de Aseguramiento de Calidad",
          "IT Service Manager": "Gerente de Servicio de TI",
          "Change Management Specialist": "Especialista en Gestión del Cambio",

          //CATEGORY
          "Your category selection": "Tu categoría seleccionada",

          //GRAPH
          "Role VS Entries": "Rol VS Entradas",

          //MAP
          "Entries by country": "Entradas por país",

          //PSEUDO NAVBAR
          "Go back home": "Volver al inicio",
          "Admin Button": "Administrador",
          "Unlocking IT salaries, Embracing Transparency in Tech Careers.": "Desbloqueando salarios de TI, Impulsando la transparencia en las carreras tecnológicas.",

          //HOME
          "Providing transparency in IT salaries empowers professionals to make informed decisions about their career paths. Users can compare their salaries with industry standards, helping them negotiate better compensation packages and make strategic career choices.": "Proporcionar transparencia en los salarios de TI permite a los profesionales tomar decisiones informadas sobre sus carreras. Los usuarios pueden comparar sus salarios con los estándares de la industria, lo que les ayuda a negociar mejores paquetes de compensación y tomar decisiones estratégicas sobre su carrera.",
          "The platform allows users to benchmark their salaries against others in the same industry or role. This valuable data enables individuals to gauge their position in the job market, understand salary trends, and identify opportunities for career growth.": "La plataforma permite a los usuarios comparar sus salarios con otros en la misma industria o rol. Estos datos valiosos permiten a los individuos evaluar su posición en el mercado laboral, comprender las tendencias salariales e identificar oportunidades de crecimiento profesional.",
          "By openly sharing salary information, the platform contributes to fostering fair compensation practices. It helps highlight discrepancies and encourages employers to maintain competitive salary structures, creating a more equitable and just work environment for IT professionals.": "Al compartir abiertamente información salarial, la plataforma contribuye a fomentar prácticas de compensación justas. Ayuda a resaltar las discrepancias y alienta a los empleadores a mantener estructuras salariales competitivas, creando un entorno de trabajo más equitativo y justo para los profesionales de TI.",
          "The platform cultivates a sense of community among IT professionals by providing a space for users to anonymously share their compensation details. This one-way sharing of salary data allows users to gain insights into industry compensation trends and make informed decisions about their careers.": "La plataforma cultiva un sentido de comunidad entre los profesionales de TI al proporcionar un espacio para que los usuarios compartan de forma anónima los detalles de su compensación. Este intercambio unidireccional de datos salariales permite a los usuarios obtener información sobre las tendencias de compensación de la industria y tomar decisiones informadas sobre sus carreras.",

          //welcome
          "Welcome": "Bienvenid@",
          "Go to Salaries": "Ir a Salarios",

          //Spect Pages
          //TABLA
          "Years of experience": "Años de experiencia",
          "Role Name": "Nombre del Rol",
          "Category": "Categoría",
          "City": "Ciudad",
          "Country": "País",
          "Amount": "Monto",
          "Verified": "Verificado",

          //GRAPHS
          "Experience VS Salary": "Experiencia VS Salario",
          "Country VS Average": "País VS Promedio",
          "Go back to the main page": "Volver a la página principal",

          //ADMIN
          "Pending": "Pendiente",
          "To be Verified": "Por verificar",
          "view PDF": "ver PDF",
          "Selected PDF": "PDF seleccionado",
          "Please select a PDF from the table by clicking on the": "Por favor seleccione un PDF de la tabla haciendo click en el",
          "Verification date": "Fecha de verificación",
          "Previous": "Anterior",
          "Next": "Siguiente",
          "Verify PDF": "Verificar PDF",
          "Reject PDF": "Rechazar PDF",

          //MODAL
          "PDF verification": "Verificación de PDF",
          "Are you sure you want to verify this PDF?": "¿Estás seguro que quieres verificar este PDF?",
          "A verification email will be sent to the user.": "Se enviará un email de verificación al usuario.",
          "Cancel": "Cancelar",
          "Verify": "Verificar",
          "PDF rejection": "Rechazo de PDF",
          "Are you sure you want to reject this PDF?": "¿Estás seguro que quieres rechazar este PDF?",
          "A rejection email will be sent to the user.": "Se enviará un email de rechazo al usuario.",
          "Reject": "Rechazar",

          //SALARY FORM SUBMISSION
          "Submit information": "Subir información",
          "IT category": "Categoría de TI",
          "Select a category": "Seleccione una categoría",
          "Software Development": "Desarrollo de Software",
          "Cybersecurity": "Ciberseguridad",
          "Data Science and Analytics": "Ciencia de Datos y Analítica",
          "Network and Systems Administration": "Administración de Redes y Sistemas",
          "IT Project Management": "Gestión de Proyectos de TI",
          "Specific role": "Rol específico",
          "Select a role": "Seleccione un rol",
          "Select a country": "Seleccione un país",
          "Annual salary in USD": "Salario anual en USD",
          "Upload Salary optional": "Subir Salario opcional",
          "Select a city": "Seleccione una ciudad",
          "Submit": "Subir",
          "Go back Home": "Volver al inicio",

          //LOGIN
          "Username": "Nombre de usuario",
          "Password": "Contraseña",
          "Sign in": "Iniciar sesión",
          "Sign up": "Registrarse",
          "Don\'t have an account yet?": "¿No tienes una cuenta todavía?",

          //REGISTER
          "Registration": "Registro",
          "Name": "Nombre",
          "Confirm Password": "Confirmar Contraseña",
          "Already have an account with us?": "¿Ya tienes una cuenta con nosotros?",
        }
      }
    },
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;