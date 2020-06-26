const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express()
const Twit = require('twit');
require('dotenv').config();

const Bot = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET  
});

//stream = Bot.stream('statuses/mentions_timeline')

var sentences= [
    'Creyeron que podrían matarnos, pero no sabían que éramos semillas ',
    'Quien te ama, No maltrata, No humilla. NO MATA',
    'A mi cuerpA no le interesa tu opinión, déjame caminar tranquila',
    'De camino a casa quiero ser libre, no valiente',
    'No nací mujer para morir por serlo ',  
    'Defensoría del Pueblo: Cada 5 horas, una mujer desaparece en el Perú',
    '8 de marzo, Día de lucha no de descuentos',
    '¿Cuantos golpes exige la Policía Nacional del Perú para tomar en cuenta tu denuncia por tentativa de feminicidio?',
    'El estado opresor es un macho violador ',
    'Niñas, no madres',
    'Perú, pais de violadores',
    'Vivas, libres y sin miedo',
    'El culpable es siempre el violador ',
    'Ni las mujeres, ni la tierra somos territorio de conquista',
    'Lavar y cocinar tambien es trabajar',
    'Aborto legal, gratuito y seguro',
    '#8M No se festeja, ¡Se Lucha!',
    'Mujeres feministas toman las calles de Lima ',
    'Perú 2019: 164 Mujeres asesinadas, 2236 mujeres desaparecidas #NiUnaMenos',
    'Somos muchas y ya no tenemos miedo',
    'A esta sociedad le indigna más una mujer libre que una asesinada ',
    'Revolución feminista: Sin nosotras no se mueve el mundo',
    '#8M Revolución feminista',
    'Lavar y planchar, no es amor, es trabajo explotado',
    'Prostitución es violación pagada',
    'Existo porque resisto',
    'Verga violadora a la licuadora',
    'El violador eres tú',
    'Policía Nacional del Perú es un violador',
    'La revolución será feminista o no será ',
    'Canal Latina odia a las mujeres',
    'Perú 2019: 164 feminicidios ',
    'El patriarcado se casó con el capitalismo',
    'Nos quitaron todo, hasta el miedo',
    'El patriarcado es un juez, que nos juzga por nacer',
    'La culpa no era mía ni dónde estaba ni cómo vestía, ¡El violador eras tú! ',
    'Mi muñeca me habló, me dijo lucha',
    'Me cuidan mis amigas, no la Policía',
    'Ahora que estamos juntas, ahora que si nos ven. ¡Abajo el patriarcado que va a caer!',
    'Arriba el feminismo que va a vencer',
    'No somos una, no somos dos, somos las mujeres a una sola voz',
    'Aborto sí, aborto no. Eso lo decido yo',
    'Denuncia archivada, mujer asesinada',
    '¡Jueces y fiscales, también son culpables!',
    'Ni víctimas, ni pasivas. Somos mujeres combativas',
    'No está perdida. Está desaparecida y no hace nada la policía',
    'No fue un crimen pasional, fue un macho patriarcal',
    'Educación sexual para decidir. Anticonceptivos para no abortar. Aborto legal para no morir',
    'Somos las hijas de las campesinas que no pudiste esterilizar',
    'Tocan a una, respondemos todas',
    'Saca tu rosario de mis ovarios',
    'Macho de izquierda, macho de derecha, son la misma mierda',
    'Si no hay aborto legal, todo vamos a quemar',
    'Nos enseñaron a ser rivales pero decidimos ser aliadas',
    'Las niñas no se matan',
    'Las niñas no se queman',
    'Somos las hijas de las esclavas que no pudiste asesinar',
    'Alerta comadrona que el huevo no es gallina y el cigoto no es persona',
    '¡Si el papa fuera mujer, el aborto sería ley!',
    'Hay que abortar este sistema patriarcal',
    'Alerta que caminan mujeres feministas por América Latina',
    'Mujeres contra el terrorismo neoliberal',
    'No quiero tu piropo, exijo tu respeto',
    'No dejes de luchar, por un aborto libre, seguro y legal.',
    'Señor, señora no sea indiferente, se matan a las mujeres en la cara de la gente',
    '¡Basta de patriarcado y que nos digan que hacer! Aborto libre y gratuito para que decida la mujer',
    'Mujer, escucha. Unete a la lucha',
    'Mujer que se organiza ya no plancha más camisas',
    'Se cuidan los machistas, América Latina será toda feminista',
    'La faldita chiquitita, no me hace facilita',
    'Tu piropo es agresión, que se convierte en violación',
    '¿Hasta cuando el Opus Dei persiguiendo a las gays?, ¿Hasta cuando el estado sosteniendo al patriarcado?',
    'Amiga, amiga no seas liberal, estamos en la lucha antipatriarcal',
    'Ahora, ahora quieren vida cuando en la dictadura ligaban campesinas',
  'Ya lo sabía, yo lo sabía, que a los violadores los cuida la policía',
    'En Perú, a los violadores y femicidas, los cuida la policía',
    'La Policía no nos cuida y la fiscalía no nos cree, ¡Volvamos a las calles! #LaPolicíaNoMeCuida',
  'Tres jueces liberaron a José Felizardo Zoriano. Volvió a casa de su hija e intentó quemarla. 8 denuncias tenía.'
]

app.use(express.static('/'));

/*function tweet(){
    var index= Math.floor(Math.random() * (sentences.length));
    var tweet = sentences[index]
    // return tweet ;

Bot.post('statuses/update', {status: tweet}, function(error, tweet, response) {
                        if (error) {
                            console.log("Error making post. ", error.message);
                        };
});
}

function random_from_array(arr){
    return arr[Math.floor(Math.random()*arr.length)]; 
}

console.log(tweet())*/

function random_from_array(arr){
    return arr[Math.floor(Math.random()*arr.length)]; 
}

app.all("/", function (request, response) {

    fs.readFile(__dirname + '/last_mention_id.txt', 'utf8', function (err, last_mention_id) {
      /* First, let's load the ID of the last tweet we responded to. */
      console.log('last_mention_id:', last_mention_id);
  
      Bot.get('search/tweets', { q: '@lafrasefeminist -filter:retweets', include_rts: 'FALSE', since_id: last_mention_id }, function(err, data, response) {
        if (err){
          console.log('Error!', err);
          return false;
        }
        /* Next, let's search for Tweets that mention our bot, starting after the last mention we responded to. */
        if (data.statuses.length) {
          console.log(data.statuses);
          data.statuses.forEach(function(status) {
            console.log(status.id_str);
            console.log(status.text);
            console.log(status.user.screen_name);
  
            /* Now we can respond to each tweet. */
            Bot.post('statuses/update', {
              status: '@' + status.user.screen_name + ' ' + random_from_array(sentences),
              in_reply_to_status_id: status.id_str
            }, function(err, data, response) {
              if (err){
                  /* TODO: Proper error handling? */
                console.log('Error!', err);
              }
              else{
                fs.writeFile(__dirname + '/last_mention_id.txt', status.id_str, function (err) {
                  /* TODO: Error handling? */
                  if(err){
                    console.log('Error!', err);
                  }
                });
              }
            });
          });
        } else {
          /* No new mentions since the last time we checked. */
          console.log('No new mentions...');      
        }
      });    
    });
    response.sendStatus(200);
  });

  var listener = app.listen(process.env.PORT, function () {
    console.log('Your bot is running on port ' + listener.address().port);
  });
