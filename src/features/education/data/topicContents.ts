import type { Topic, TopicContentBlock } from '../types';
import { TOPIC_METAS } from './topicCatalog';

// Mapeo de contenido por slug. Se combina con TOPIC_METAS al final.
const CONTENT_BY_SLUG: Record<
  string,
  {
    importantNote: { title: string; text: string };
    blocks: TopicContentBlock[];
    closing: string;
  }
> = {
  // ===========================================================
  'reconocer-sintomas': {
    importantNote: {
      title: 'Lo más importante que debe recordar',
      text:
        'Si sospecha que usted o alguien cerca está sufriendo un infarto, llame inmediatamente al 911. No espere. No conduzca al hospital por su cuenta. Cada minuto cuenta.',
    },
    blocks: [
      { type: 'heading', text: 'Por qué importa reconocer los síntomas' },
      {
        type: 'paragraph',
        text:
          'Un infarto ocurre cuando una parte del corazón deja de recibir sangre. Mientras más tiempo pasa sin tratamiento, más músculo del corazón se daña. Reconocer los signos a tiempo y pedir ayuda en los primeros minutos es la diferencia entre una recuperación completa y un daño permanente.',
      },
      {
        type: 'paragraph',
        text:
          'En adultos mayores, los síntomas no siempre son tan claros como se ven en las películas. A veces son leves, confusos, o se parecen a otros malestares comunes. Por eso es tan importante saber qué buscar.',
      },
      { type: 'heading', text: 'Los signos más comunes' },
      {
        type: 'paragraph',
        text: 'Los síntomas que aparecen con más frecuencia durante un infarto son:',
      },
      {
        type: 'paragraph',
        text:
          'Dolor o presión en el pecho. Es el síntoma más conocido. Se siente como un peso, una opresión o un apretón en el centro del pecho. Puede durar varios minutos, o aparecer y desaparecer. No siempre es un dolor "fuerte" — a veces es solo una molestia incómoda.',
      },
      {
        type: 'paragraph',
        text:
          'Falta de aire o dificultad para respirar. Sentir que le falta el aire, incluso estando en reposo o haciendo poco esfuerzo, es una señal importante. Puede aparecer junto con el dolor de pecho o por sí sola.',
      },
      {
        type: 'paragraph',
        text:
          'Dolor que se extiende a otras partes del cuerpo. El dolor puede salir del pecho y llegar al brazo izquierdo, al cuello, a la mandíbula, a la espalda o al estómago. Esto es muy típico de un infarto, aunque mucha gente no lo asocia.',
      },
      {
        type: 'paragraph',
        text:
          'Náuseas, sudoración fría o mareo. Sentirse de pronto muy mareado, con náuseas o sudando frío sin razón aparente puede acompañar a un infarto, especialmente en mujeres y en personas mayores.',
      },
      { type: 'heading', text: 'Síntomas que pueden confundirse' },
      {
        type: 'paragraph',
        text:
          'Algunos signos del infarto pueden parecerse a otros problemas más comunes. No los descarte sin pensarlo:',
      },
      {
        type: 'list',
        items: [
          'Una indigestión que no se quita.',
          'Dolor en la espalda alta que aparece de golpe.',
          'Cansancio inusual, como si no tuviera energía para nada.',
          'Sensación de "algo no anda bien" sin poder explicar qué.',
        ],
      },
      {
        type: 'paragraph',
        text:
          'Si tiene factores de riesgo (presión alta, diabetes, colesterol alto, antecedentes familiares), estos síntomas merecen aún más atención.',
      },
      { type: 'heading', text: 'Qué hacer si los reconoce' },
      {
        type: 'paragraph',
        text: 'Si nota uno o varios de estos signos, en usted o en alguien cerca:',
      },
      {
        type: 'numbered_list',
        items: [
          'Llame al 911 de inmediato. No espere a "ver si se pasa".',
          'Siéntese o recuéstese. Evite caminar o hacer esfuerzos.',
          'Afloje la ropa, especialmente alrededor del cuello y la cintura.',
          'Mantenga la calma y respire despacio mientras espera ayuda.',
          'No coma ni tome nada, salvo que el personal de emergencias le indique.',
        ],
      },
      {
        type: 'highlight',
        variant: 'tip',
        title: 'Un dato útil',
        text:
          'Las mujeres y los adultos mayores a veces tienen infartos "silenciosos", con síntomas suaves como cansancio extremo o malestar general. Si algo se siente fuera de lo normal y persiste, no dude en buscar ayuda médica.',
      },
    ],
    closing:
      'Reconocer un infarto a tiempo es una de las habilidades más valiosas que puede tener. No tiene que ser médico para identificar los signos — solo necesita saber qué mirar y actuar rápido. Su rapidez puede salvar su propia vida o la de alguien que ama.',
  },

  // ===========================================================
  'que-es-infarto': {
    importantNote: {
      title: 'Lo más importante que debe recordar',
      text:
        'Un infarto es una emergencia médica. No es algo que pase "de a poco" ni que se pueda esperar a ver si mejora. Si sospecha uno, llame al 911 inmediatamente.',
    },
    blocks: [
      { type: 'heading', text: 'Cómo trabaja su corazón' },
      {
        type: 'paragraph',
        text:
          'Su corazón es un músculo del tamaño de su puño que late entre 60 y 100 veces por minuto, todos los días de su vida. Cada latido envía sangre con oxígeno a todo su cuerpo. Pero el corazón también necesita su propia sangre para funcionar, y la recibe a través de unos conductos llamados arterias coronarias.',
      },
      {
        type: 'paragraph',
        text:
          'Cuando esas arterias funcionan bien, el corazón recibe oxígeno suficiente y trabaja sin problema. Cuando se tapan, comienza el riesgo.',
      },
      { type: 'heading', text: 'Qué pasa durante un infarto' },
      {
        type: 'paragraph',
        text:
          'Un infarto ocurre cuando una de las arterias coronarias se bloquea, generalmente por la acumulación de grasa, colesterol y otras sustancias que con los años se pegan a las paredes internas. Cuando ese bloqueo corta el paso de la sangre, una parte del corazón se queda sin oxígeno.',
      },
      {
        type: 'paragraph',
        text:
          'Si la sangre no vuelve a circular rápido, esa parte del corazón comienza a dañarse. Mientras más tiempo pasa, más músculo se pierde. Por eso los médicos repiten siempre: "Tiempo es músculo".',
      },
      { type: 'heading', text: 'Por qué importa saber esto' },
      {
        type: 'paragraph',
        text:
          'Mucha gente piensa que un infarto es algo que "le pasa a los demás" o que se ve venir con mucho tiempo. La realidad es distinta: muchos infartos llegan de pronto, sin aviso claro. Pero hay factores que aumentan el riesgo y que sí se pueden controlar.',
      },
      { type: 'paragraph', text: 'Los más conocidos son:' },
      {
        type: 'list',
        items: [
          'Presión arterial alta.',
          'Colesterol elevado.',
          'Diabetes o glucosa alta.',
          'Fumar.',
          'Vida sedentaria, sin ejercicio.',
          'Sobrepeso.',
          'Antecedentes familiares de problemas del corazón.',
        ],
      },
      {
        type: 'paragraph',
        text:
          'Mientras más factores tenga, más importante es prestar atención a su salud cardiovascular.',
      },
      {
        type: 'highlight',
        variant: 'tip',
        title: 'Un dato útil',
        text:
          'El infarto no es lo mismo que un paro cardíaco, aunque la gente a veces los confunde. El infarto es un bloqueo de sangre al corazón. El paro cardíaco es cuando el corazón se detiene por completo. Uno puede llevar al otro, pero no son la misma cosa.',
      },
    ],
    closing:
      'Saber qué es un infarto, cómo ocurre y qué lo provoca le da una ventaja real: la de poder cuidarse mejor y reconocer una emergencia cuando suceda. Su corazón trabaja para usted toda la vida — vale la pena conocerlo un poco.',
  },

  // ===========================================================
  'factores-riesgo': {
    importantNote: {
      title: 'Lo más importante que debe recordar',
      text:
        'La presión alta, la diabetes y el colesterol elevado no duelen. Por eso se les llama "enemigos silenciosos". La única forma de saber si los tiene es midiéndolos regularmente con su médico.',
    },
    blocks: [
      { type: 'heading', text: 'Presión arterial alta (hipertensión)' },
      {
        type: 'paragraph',
        text:
          'La presión arterial es la fuerza con que la sangre empuja las paredes de sus arterias cuando el corazón late. Si esa fuerza es muy alta de forma constante, las arterias se desgastan y el corazón tiene que trabajar más de la cuenta.',
      },
      {
        type: 'paragraph',
        text:
          'Lo peligroso es que la presión alta casi nunca produce síntomas. Mucha gente vive años sin saber que la tiene, hasta que aparece un problema serio: infarto, derrame cerebral o falla del corazón.',
      },
      { type: 'paragraph', text: 'Lo que conviene hacer:' },
      {
        type: 'list',
        items: [
          'Medirse la presión al menos una vez al mes si tiene más de 60 años.',
          'Reducir la sal en las comidas.',
          'Mantener un peso saludable.',
          'Caminar o moverse todos los días, dentro de sus posibilidades.',
        ],
      },
      { type: 'heading', text: 'Diabetes y glucosa alta' },
      {
        type: 'paragraph',
        text:
          'La glucosa es el azúcar en la sangre. Cuando se mantiene alta por mucho tiempo, daña los vasos sanguíneos del corazón, los ojos, los riñones y los nervios. Las personas con diabetes tienen entre dos y cuatro veces más riesgo de tener un infarto.',
      },
      { type: 'paragraph', text: 'Algunos signos de glucosa alta:' },
      {
        type: 'list',
        items: [
          'Sed constante.',
          'Necesidad de orinar muchas veces.',
          'Cansancio sin razón.',
          'Heridas que tardan en sanar.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Si tiene alguno de estos signos, conviene hacerse un examen de sangre con su médico.',
      },
      { type: 'heading', text: 'Colesterol elevado' },
      {
        type: 'paragraph',
        text:
          'El colesterol es una grasa que su cuerpo necesita en cantidades pequeñas. El problema aparece cuando hay demasiado: se pega a las paredes de las arterias y, con los años, las tapa. Es una de las causas más comunes de infarto.',
      },
      { type: 'paragraph', text: 'Hay dos tipos principales:' },
      {
        type: 'list',
        items: [
          'El colesterol "bueno" (HDL), que ayuda a limpiar las arterias.',
          'El colesterol "malo" (LDL), que es el que las tapa.',
        ],
      },
      {
        type: 'paragraph',
        text: 'El examen de sangre que mide el colesterol también muestra ambos.',
      },
      {
        type: 'highlight',
        variant: 'tip',
        title: 'Un dato útil',
        text:
          'Los tres factores —presión, diabetes y colesterol— se relacionan entre sí. Tener uno aumenta la probabilidad de desarrollar los otros. Por eso cuidarse en alimentación y actividad física tiene un efecto positivo en los tres al mismo tiempo.',
      },
    ],
    closing:
      'Estos tres factores son, en gran parte, controlables con hábitos saludables y controles médicos regulares. No se trata de tener miedo, sino de informarse y actuar. Saber sus números (presión, glucosa, colesterol) es como saber el estado de su cuenta bancaria: si no los conoce, no puede cuidarlos.',
  },

  // ===========================================================
  'habitos-saludables': {
    importantNote: {
      title: 'Lo más importante que debe recordar',
      text:
        'No tiene que cambiar toda su vida de golpe. Un pequeño hábito mantenido todos los días vale más que un gran esfuerzo de una semana. La constancia es el secreto.',
    },
    blocks: [
      { type: 'heading', text: 'Mover el cuerpo, todos los días' },
      {
        type: 'paragraph',
        text:
          'El corazón es un músculo, y como cualquier músculo, se fortalece cuando se usa. Caminar es uno de los mejores ejercicios para adultos mayores: no requiere equipo, no hace falta gimnasio, y se puede hacer en compañía.',
      },
      { type: 'paragraph', text: 'Lo recomendable:' },
      {
        type: 'list',
        items: [
          'Camine al menos 30 minutos al día, idealmente todos los días.',
          'Si 30 minutos seguidos es mucho, divida en dos sesiones de 15.',
          'Vaya a un ritmo cómodo pero firme, donde pueda hablar pero no cantar.',
        ],
      },
      {
        type: 'paragraph',
        text:
          'Si tiene problemas de rodillas, columna o equilibrio, consulte con su médico qué actividad es más adecuada para usted. Nadar, ejercicios sentados o estiramientos suaves también cuentan.',
      },
      { type: 'heading', text: 'Comer mejor, no menos' },
      {
        type: 'paragraph',
        text: 'Cuidar la alimentación no es pasar hambre. Es elegir mejor lo que come.',
      },
      { type: 'paragraph', text: 'Lo que conviene aumentar:' },
      {
        type: 'list',
        items: [
          'Frutas y verduras frescas.',
          'Pescado, especialmente los grasos como sardina o atún.',
          'Granos como lenteja, frejol, garbanzo.',
          'Frutos secos sin sal (nueces, almendras).',
          'Aceite de oliva o de girasol en lugar de manteca.',
        ],
      },
      { type: 'paragraph', text: 'Lo que conviene reducir:' },
      {
        type: 'list',
        items: [
          'Sal en exceso (cuidado con embutidos, conservas y caldos en cubo).',
          'Azúcar y dulces.',
          'Grasas fritas o reutilizadas.',
          'Carnes muy procesadas como salchichas o mortadela.',
        ],
      },
      {
        type: 'paragraph',
        text: 'No tiene que eliminar todo de golpe. Cambiar una sola cosa por semana ya es progreso.',
      },
      { type: 'heading', text: 'Dejar el tabaco' },
      {
        type: 'paragraph',
        text:
          'Fumar es uno de los factores que más daña al corazón. La buena noticia es que dejar de fumar tiene beneficios inmediatos, sin importar la edad ni cuántos años llevó fumando:',
      },
      {
        type: 'list',
        items: [
          'En 24 horas, mejora la circulación.',
          'En semanas, se respira mejor.',
          'En un año, el riesgo de infarto baja a la mitad.',
        ],
      },
      {
        type: 'paragraph',
        text:
          'Si está intentando dejarlo y no lo logra solo, pida ayuda. Hay programas gratuitos en los centros de salud pública.',
      },
      { type: 'heading', text: 'Dormir bien' },
      {
        type: 'paragraph',
        text:
          'Dormir entre 7 y 8 horas por noche le da descanso al corazón. Dormir muy poco o muy mal está relacionado con presión alta y problemas cardíacos. Si ronca fuerte o se siente cansado al despertar, comente con su médico — podría haber una causa tratable.',
      },
      {
        type: 'highlight',
        variant: 'tip',
        title: 'Un dato útil',
        text:
          'El estrés también afecta al corazón. Actividades como caminar al aire libre, conversar con familiares, escuchar música o tener un pasatiempo no son lujos: son medicina para el alma y para el corazón.',
      },
    ],
    closing:
      'Prevenir es siempre más sencillo que curar. Cada caminata, cada comida balanceada, cada noche de buen sueño es una inversión en su salud. Su corazón le devolverá ese cuidado con más años de vida activa.',
  },

  // ===========================================================
  'rcp-basica': {
    importantNote: {
      title: 'Lo más importante que debe recordar',
      text:
        'La RCP no reemplaza la atención médica, pero gana tiempo mientras llega la ambulancia. Sin RCP, las probabilidades de sobrevivir a un paro cardíaco caen rápidamente cada minuto que pasa.',
    },
    blocks: [
      { type: 'heading', text: 'Qué es la RCP' },
      {
        type: 'paragraph',
        text:
          'RCP significa "reanimación cardiopulmonar". Es una técnica que se usa cuando una persona deja de respirar o su corazón se detiene. Consiste en hacer presión rítmica sobre el pecho para que la sangre siga circulando hasta que llegue ayuda profesional.',
      },
      {
        type: 'paragraph',
        text: 'No hace falta ser médico ni enfermero para aplicarla. Cualquier persona puede aprender los pasos básicos.',
      },
      { type: 'heading', text: 'Cuándo se aplica' },
      { type: 'paragraph', text: 'La RCP se aplica cuando una persona:' },
      {
        type: 'list',
        items: [
          'No responde cuando le habla o le toca el hombro.',
          'No respira o respira de forma muy irregular.',
          'No tiene signos visibles de vida.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Antes de comenzar, llame al 911 o pida a alguien cerca que lo haga.',
      },
      { type: 'heading', text: 'Los pasos básicos (versión simple)' },
      {
        type: 'paragraph',
        text:
          'Esta es la versión simplificada conocida como "RCP solo con manos", recomendada por organizaciones de salud para personas sin entrenamiento avanzado:',
      },
      {
        type: 'numbered_list',
        items: [
          'Coloque a la persona boca arriba en una superficie firme (el piso sirve).',
          'Arrodíllese a su lado, cerca del pecho.',
          'Ponga la base de una mano en el centro del pecho, entre los pezones.',
          'Coloque la otra mano encima, entrelazando los dedos.',
          'Con los brazos rectos, presione hacia abajo con firmeza unos 5 centímetros.',
          'Suelte para que el pecho vuelva a subir, y repita.',
        ],
      },
      {
        type: 'paragraph',
        text:
          'El ritmo debe ser de aproximadamente 2 compresiones por segundo (100 a 120 por minuto). Una canción que sirve para mantener el ritmo es "La Cucaracha" o "Stayin\' Alive".',
      },
      {
        type: 'paragraph',
        text: 'Continúe hasta que llegue ayuda profesional o la persona muestre signos de vida.',
      },
      { type: 'heading', text: 'Lo que NO debe hacer' },
      {
        type: 'list',
        items: [
          'No detenerse a "ver si se mueve". Solo pare si llega ayuda o la persona reacciona.',
          'No tener miedo de hacer fuerza. Es mejor una compresión firme que una débil.',
          'No abandonar a la persona si está solo. Mantenga las compresiones mientras pueda.',
        ],
      },
      {
        type: 'highlight',
        variant: 'tip',
        title: 'Un dato útil',
        text:
          'En adultos mayores, las costillas pueden ser frágiles y a veces se fracturan durante la RCP. Esto suena alarmante, pero los médicos confirman que una costilla rota se cura — un paro cardíaco no atendido, no. Si tiene que hacer RCP, hágala con firmeza.',
      },
    ],
    closing:
      'La RCP es una de las habilidades más valiosas que un adulto puede tener, especialmente si vive con o cerca de personas mayores. Si nunca la ha practicado, considere tomar una capacitación corta — son gratuitas en muchos centros de salud y bomberos.',
  },

  // ===========================================================
  'capacitacion-primeros-auxilios': {
    importantNote: {
      title: 'Lo más importante que debe recordar',
      text:
        'En una emergencia, los primeros minutos son los más importantes. Saber qué hacer en ese momento puede ser la diferencia entre una recuperación y una tragedia.',
    },
    blocks: [
      { type: 'heading', text: 'Por qué tomar una capacitación' },
      {
        type: 'paragraph',
        text:
          'Cuando alguien se siente mal, se desmaya, se quema o sufre una caída, la primera persona que puede ayudar no es el médico — es quien esté cerca en ese momento. Si esa persona sabe primeros auxilios, las probabilidades de un buen resultado aumentan mucho.',
      },
      {
        type: 'paragraph',
        text: 'Las capacitaciones en primeros auxilios suelen durar pocas horas y enseñan cosas concretas:',
      },
      {
        type: 'list',
        items: [
          'Cómo evaluar una situación de emergencia sin ponerse en peligro.',
          'Cómo aplicar RCP correctamente.',
          'Qué hacer ante una caída, un desmayo o un atragantamiento.',
          'Cómo controlar un sangrado o atender una quemadura.',
          'Cuándo y cómo llamar a emergencias.',
        ],
      },
      { type: 'heading', text: 'Para quién es útil' },
      {
        type: 'paragraph',
        text: 'Los primeros auxilios son útiles para cualquier persona, pero especialmente para:',
      },
      {
        type: 'list',
        items: [
          'Quienes viven con adultos mayores o niños.',
          'Quienes cuidan a alguien con enfermedades crónicas.',
          'Quienes pasan tiempo solos en casa.',
          'Quienes participan en actividades al aire libre o viajes.',
        ],
      },
      {
        type: 'paragraph',
        text:
          'Y también para los propios adultos mayores: saber qué hacer si usted se siente mal le permite reaccionar mejor y guiar a quienes le rodean.',
      },
      { type: 'heading', text: 'Dónde se puede aprender' },
      {
        type: 'paragraph',
        text:
          'En Ecuador, hay varios lugares donde se ofrecen capacitaciones gratuitas o de bajo costo:',
      },
      {
        type: 'list',
        items: [
          'Cruz Roja Ecuatoriana dicta cursos abiertos al público.',
          'Cuerpo de Bomberos suele ofrecer talleres comunitarios.',
          'Centros de salud pública a veces organizan charlas para adultos mayores.',
          'Algunas iglesias, fundaciones y clubes barriales también promueven estos cursos.',
        ],
      },
      {
        type: 'paragraph',
        text:
          'Si tiene familiares jóvenes, también puede animarlos a tomar el curso. Saber que alguien en casa está capacitado da tranquilidad.',
      },
      {
        type: 'highlight',
        variant: 'tip',
        title: 'Un dato útil',
        text:
          'Muchas personas evitan ayudar en emergencias por miedo a "hacerlo mal". Pero los estudios muestran que es mejor intentar algo que no hacer nada. Una capacitación de pocas horas le da la confianza para actuar cuando importa.',
      },
    ],
    closing:
      'Una capacitación en primeros auxilios es una pequeña inversión de tiempo con un retorno enorme: la capacidad de ayudar a salvar una vida — la suya, la de un ser querido, o la de un desconocido. Nunca se sabe cuándo será necesaria, pero quien la tiene, la tiene para siempre.',
  },

  // ===========================================================
  'numero-emergencias': {
    importantNote: {
      title: 'Lo más importante que debe recordar',
      text:
        'En Ecuador, el número de emergencias es el 911. Funciona las 24 horas, los 365 días del año, desde cualquier teléfono — fijo, celular, con o sin saldo. Es gratis.',
    },
    blocks: [
      { type: 'heading', text: 'Para qué sirve el 911' },
      {
        type: 'paragraph',
        text:
          'El 911 es el número único de emergencias del Ecuador. Atiende todo tipo de situaciones urgentes:',
      },
      {
        type: 'list',
        items: [
          'Problemas de salud: infarto, desmayo, caída grave, dificultad para respirar.',
          'Accidentes de tránsito.',
          'Incendios.',
          'Robos o asaltos.',
          'Cualquier emergencia que requiera ayuda profesional inmediata.',
        ],
      },
      {
        type: 'paragraph',
        text:
          'Cuando llama, lo conectan con el servicio correcto: ambulancia, bomberos o policía, según lo que necesite.',
      },
      { type: 'heading', text: 'Cuándo llamar' },
      { type: 'paragraph', text: 'Llame al 911 cuando:' },
      {
        type: 'list',
        items: [
          'Sospeche un infarto u otra emergencia médica.',
          'Alguien no responde, no respira, o respira con mucha dificultad.',
          'Hay un sangrado fuerte que no se detiene.',
          'Hay un accidente con heridos.',
          'Hay un incendio o humo en su casa o cerca.',
          'Siente que algo grave está pasando y no sabe qué hacer.',
        ],
      },
      {
        type: 'paragraph',
        text:
          'Es mejor llamar y que no sea grave, que no llamar y que sí lo sea. Los operadores están preparados para guiarle.',
      },
      { type: 'heading', text: 'Qué decir cuando llame' },
      {
        type: 'paragraph',
        text: 'Mantenga la calma, hable claro y dé esta información:',
      },
      {
        type: 'numbered_list',
        items: [
          'Qué pasa: "Mi esposo no responde y respira con dificultad."',
          'Dónde: dirección exacta, sector, referencia (por ejemplo: "casa amarilla frente al parque").',
          'Quién está afectado: edad aproximada, sexo, si tiene enfermedades conocidas.',
          'Su nombre y teléfono, por si necesitan llamarlo de vuelta.',
        ],
      },
      {
        type: 'paragraph',
        text:
          'El operador puede hacerle preguntas adicionales. No cuelgue hasta que él se lo indique — muchas veces le dará instrucciones para ayudar mientras llega la ambulancia.',
      },
      { type: 'heading', text: 'Errores comunes que evitar' },
      {
        type: 'list',
        items: [
          'No llamar por miedo a "molestar". El 911 existe para esto.',
          'Colgar antes de tiempo. Espere las instrucciones del operador.',
          'Dar direcciones vagas. "Cerca del mercado" no basta — sea lo más específico posible.',
          'Gritar o llorar sin dar información. Respire hondo antes de hablar.',
        ],
      },
      {
        type: 'highlight',
        variant: 'tip',
        title: 'Un dato útil',
        text:
          'Es buena idea tener el 911 anotado en un lugar visible (al lado del teléfono, en la refrigeradora) y enseñar a los nietos a llamar desde pequeños. Que toda la familia lo sepa de memoria.',
      },
    ],
    closing:
      'El 911 es uno de los recursos más importantes que tiene a su disposición. Saber cuándo llamar, qué decir y cómo cooperar con el operador puede hacer que la ayuda llegue más rápido — y en una emergencia, cada minuto cuenta.',
  },

  // ===========================================================
  'que-hacer-emergencia': {
    importantNote: {
      title: 'Lo más importante que debe recordar',
      text:
        'Ante una emergencia cardiovascular, lo primero es llamar al 911. Lo segundo es no mover a la persona innecesariamente. Lo tercero es mantener la calma — sus acciones tienen más peso si vienen sin pánico.',
    },
    blocks: [
      { type: 'heading', text: 'Reconocer la emergencia' },
      {
        type: 'paragraph',
        text:
          'Antes de actuar, asegúrese de que se trata de una emergencia real. Las señales que indican que necesita llamar al 911 ya:',
      },
      {
        type: 'list',
        items: [
          'Dolor o presión fuerte en el pecho que dura más de unos minutos.',
          'Falta de aire intensa.',
          'Sudoración fría sin razón.',
          'Mareo, desmayo o pérdida de conciencia.',
          'Confusión repentina o dificultad para hablar.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Si tiene dudas, llame igual. Los operadores del 911 le ayudarán a evaluar la situación.',
      },
      { type: 'heading', text: 'Los pasos a seguir' },
      {
        type: 'paragraph',
        text: 'Cuando la emergencia ya está sucediendo, siga este orden:',
      },
      {
        type: 'paragraph',
        text:
          'Llame al 911 (o pida a alguien que lo haga). Dé la dirección clara y describa los síntomas. No cuelgue hasta que el operador lo indique.',
      },
      {
        type: 'paragraph',
        text:
          'Ayude a la persona a sentarse o recostarse. Si está consciente, busque una posición cómoda. Si está acostada, mantenga la cabeza ligeramente elevada. Afloje ropa apretada en cuello y cintura.',
      },
      {
        type: 'paragraph',
        text:
          'Asegure el ambiente. Abra una ventana, aleje a personas curiosas para que entre aire fresco. Si está en un lugar público, pida ayuda en voz clara.',
      },
      {
        type: 'paragraph',
        text:
          'Hable con calma. Si la persona está consciente, hable suave y firme. Asegúrele que la ayuda viene en camino. El miedo y la ansiedad empeoran los síntomas del corazón.',
      },
      {
        type: 'paragraph',
        text:
          'No le dé nada de comer ni beber. Salvo que el operador del 911 lo indique. El estómago vacío facilita la atención médica que viene después.',
      },
      {
        type: 'paragraph',
        text:
          'Si pierde el conocimiento y deja de respirar: comience RCP. Si está capacitado, aplique compresiones de pecho como se describe en el tema de RCP. Si no, el operador del 911 puede guiarle por teléfono.',
      },
      { type: 'heading', text: 'Errores que conviene evitar' },
      {
        type: 'list',
        items: [
          'No la lleve usted mismo al hospital. Una ambulancia tiene equipo y personal que puede atender en el camino.',
          'No le dé medicamentos por su cuenta, ni siquiera "los de siempre". Espere indicación médica.',
          'No deje a la persona sola. Si tiene que buscar algo, mantenga la voz en contacto.',
          'No la sacuda ni la haga caminar. Cualquier esfuerzo puede agravar la situación.',
        ],
      },
      {
        type: 'highlight',
        variant: 'tip',
        title: 'Un dato útil',
        text:
          'Si la persona está consciente y tiene aspirina recetada por su médico para casos de emergencia, el operador del 911 puede indicarle administrarla. Nunca por iniciativa propia — solo siguiendo instrucciones médicas.',
      },
    ],
    closing:
      'Una emergencia cardiovascular es uno de los momentos más estresantes que puede vivir. Pero saber qué hacer de antemano le da algo invaluable: claridad cuando más la necesita. No tiene que recordar todo perfectamente — solo lo esencial: llamar, calmar, esperar.',
  },

  // ===========================================================
  'tiempo-reaccion': {
    importantNote: {
      title: 'Lo más importante que debe recordar',
      text:
        'En un infarto, el tiempo es músculo cardíaco. Mientras más rápido llegue la atención médica, más corazón se salva. Esperar "a ver si pasa" puede costar vidas.',
    },
    blocks: [
      { type: 'heading', text: 'Por qué el tiempo es tan importante' },
      {
        type: 'paragraph',
        text:
          'Cuando una arteria del corazón se tapa, la parte del músculo que dependía de esa arteria comienza a morir en cuestión de minutos. Cada minuto sin atención significa más músculo perdido, y menos posibilidades de una recuperación completa.',
      },
      {
        type: 'paragraph',
        text:
          'Los médicos lo resumen así: "Tiempo es músculo". En las primeras 1 o 2 horas después del bloqueo, los tratamientos son más efectivos. Después de ese plazo, las opciones se reducen y el daño es mayor.',
      },
      { type: 'heading', text: 'Lo que pasa con cada minuto' },
      {
        type: 'list',
        items: [
          'Primeros 10 minutos: con atención inmediata (RCP, ambulancia en camino), las probabilidades de sobrevivir son altas.',
          'Después de 30 minutos: el daño al corazón ya es significativo.',
          'Después de 1 hora: el músculo dañado difícilmente se recupera.',
          'Después de varias horas: las posibilidades de recuperación caen mucho.',
        ],
      },
      {
        type: 'paragraph',
        text:
          'Por eso los expertos insisten: no esperar. Ni siquiera media hora. Si hay sospecha de infarto, se llama al 911 en el momento.',
      },
      { type: 'heading', text: 'Por qué la gente espera (y por qué no debería)' },
      {
        type: 'paragraph',
        text: 'Es común que las personas tarden en llamar por estos motivos:',
      },
      {
        type: 'list',
        items: [
          '"Quizá se me pasa". No vale la pena el riesgo. Mejor un susto que una tragedia.',
          '"No quiero molestar". Las emergencias existen para esto.',
          '"Voy a esperar a que llegue mi familiar". No espere a nadie. Llame primero.',
          '"No estoy seguro de que sea grave". Los operadores del 911 están preparados para evaluarlo.',
        ],
      },
      {
        type: 'paragraph',
        text:
          'Estudios médicos muestran que las personas tardan en promedio entre 1 y 4 horas en llamar a emergencias durante un infarto. Esa demora es la principal causa de complicaciones graves.',
      },
      { type: 'heading', text: 'Cómo reaccionar más rápido' },
      { type: 'paragraph', text: 'Aquí van algunas ideas prácticas:' },
      {
        type: 'list',
        items: [
          'Tenga el 911 visible en su casa y en su teléfono.',
          'Conozca su dirección de memoria, incluyendo referencias del barrio.',
          'Hable con su familia sobre qué hacer si pasa algo. Acuerden un plan claro.',
          'No subestime los síntomas leves. Un malestar persistente y raro merece atención.',
          'Confíe en sus instintos. Si algo se siente fuera de lo normal, busque ayuda.',
        ],
      },
      {
        type: 'highlight',
        variant: 'tip',
        title: 'Un dato útil',
        text:
          'En personas con riesgo cardiovascular, llevar siempre encima un papel con información médica básica (enfermedades, medicamentos que toma, contacto familiar) ayuda mucho al personal de emergencias. Una hoja pequeña en la billetera puede ahorrar minutos críticos.',
      },
    ],
    closing:
      'Reaccionar rápido no es ser exagerado — es ser inteligente. En las emergencias del corazón, los minutos no se recuperan. Saber esto le da el coraje de actuar sin demora cuando algo no anda bien.',
  },

  // ===========================================================
  'mientras-llega-ayuda': {
    importantNote: {
      title: 'Lo más importante que debe recordar',
      text:
        'Después de llamar al 911, no se quede paralizado. Hay acciones simples que puede hacer mientras llega la ayuda — y que pueden ser tan importantes como la atención médica que viene después.',
    },
    blocks: [
      { type: 'heading', text: 'Después de colgar el teléfono' },
      {
        type: 'paragraph',
        text:
          'Una vez que llamó al 911 y dio la información necesaria, los primeros minutos hasta que llegue la ambulancia son críticos. La persona afectada necesita su presencia, calma y unas pocas acciones específicas.',
      },
      { type: 'heading', text: 'Si la persona está consciente' },
      {
        type: 'paragraph',
        text:
          'Ayúdele a estar cómoda. La mejor posición suele ser semi-sentada, con la espalda apoyada. Eso facilita la respiración. Afloje cinturón, corbata, cuello apretado.',
      },
      {
        type: 'paragraph',
        text:
          'Manténgale en calma. Hable con voz suave y firme. Diga frases como: "La ambulancia está en camino. Va a estar bien. Respire conmigo". El miedo aumenta la presión cardíaca, y peor en una emergencia.',
      },
      {
        type: 'paragraph',
        text:
          'No le dé nada de comer ni beber. Aunque pida agua, conviene esperar la indicación del personal médico. El estómago vacío facilita los procedimientos que vendrán.',
      },
      {
        type: 'paragraph',
        text:
          'Esté atento a cambios. Si empeora, si pierde el conocimiento, si deja de responder, vuelva a llamar al 911 para informar. Manténgase observador.',
      },
      {
        type: 'paragraph',
        text:
          'Tenga cerca su información médica. Si la persona toma medicamentos, busque las cajas o un listado. Eso ayuda mucho al personal de la ambulancia cuando llegue.',
      },
      { type: 'heading', text: 'Si la persona pierde el conocimiento' },
      {
        type: 'paragraph',
        text:
          'Verifique si respira. Acerque su mejilla cerca de la nariz y la boca para escuchar y sentir. Mire si el pecho sube y baja. Demórese unos 10 segundos.',
      },
      {
        type: 'paragraph',
        text:
          'Si respira con normalidad: manténgala recostada de lado (posición de seguridad). Esto evita que se ahogue si vomita.',
      },
      {
        type: 'paragraph',
        text:
          'Si no respira o respira muy mal: comience RCP si está capacitado o si el operador del 911 le guía. No tenga miedo de hacerlo — es mejor intentar que no hacer nada.',
      },
      {
        type: 'paragraph',
        text:
          'Continúe hasta que llegue ayuda. No se detenga a "ver si reacciona". Las compresiones de RCP solo paran cuando llega la ambulancia o la persona muestra signos claros de vida.',
      },
      { type: 'heading', text: 'Mientras espera, también' },
      {
        type: 'list',
        items: [
          'Abra la puerta o portón para que la ambulancia entre sin demora.',
          'Encienda luces si es de noche, para que la encuentren rápido.',
          'Pida ayuda a un vecino si está solo: alguien que reciba a los paramédicos y guíe.',
          'Tenga listo un teléfono cargado por si necesitan volver a contactarlo.',
        ],
      },
      {
        type: 'highlight',
        variant: 'tip',
        title: 'Un dato útil',
        text:
          'Hablar con la persona consciente, aunque parezca que no le contesta, tiene un efecto calmante real. Sentir compañía baja la ansiedad y, con ello, el esfuerzo del corazón. Su presencia no es solo emocional — es médicamente útil.',
      },
    ],
    closing:
      'Esperar a la ambulancia no es estar pasivo. Es acompañar, cuidar y actuar dentro de lo que se puede. Cuando llegue el personal médico, su preparación les permitirá trabajar más rápido. Esa ayuda que usted dio en esos minutos vale más de lo que imagina.',
  },
};

// === Catálogo final: combina metadata + contenido ===
export const TOPICS: Topic[] = TOPIC_METAS.map((meta) => {
  const content = CONTENT_BY_SLUG[meta.slug];
  if (!content) {
    throw new Error(`No se encontró contenido para el tema con slug: ${meta.slug}`);
  }
  return { ...meta, ...content };
});

// Helpers de búsqueda
export const TOPICS_BY_SLUG: Record<string, Topic> = TOPICS.reduce(
  (acc, t) => {
    acc[t.slug] = t;
    return acc;
  },
  {} as Record<string, Topic>
);

export const TOPICS_BY_BACKEND_KEY: Record<string, Topic> = TOPICS.reduce(
  (acc, t) => {
    acc[t.backendKey] = t;
    return acc;
  },
  {} as Record<string, Topic>
);