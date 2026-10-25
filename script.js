document.getElementById('annee').textContent = new Date().getFullYear();

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});
const cartesAnimees = document.querySelectorAll('.anim-carte');

const observateur = new IntersectionObserver((entrees) => {
    entrees.forEach((entree) => {
        entree.target.classList.toggle('actif', entree.isIntersecting);
    });
}, { threshold: 0.4 });

cartesAnimees.forEach((carte) => observateur.observe(carte));

const exemples = [
    `public class Etudiant {
    private String nom;

    public String saluer() {
        return "Bonjour " + nom;
    }
}`,
    `public class Etudiant
{
    public string Nom { get; set; }

    public string Saluer()
    {
        return $"Bonjour {Nom}";
    }
}`,
    `class Etudiant:
    def __init__(self, nom):
        self.nom = nom

    def saluer(self):
        return f"Bonjour {self.nom}"`,
    `class Etudiant(val nom: String) {

    fun saluer(): String {
        return "Bonjour $nom"
    }
}`,
    `class Etudiant {
    var nom: String

    init(nom: String) { self.nom = nom }

    func saluer() -> String {
        return "Bonjour \\(nom)"
    }
}`
];

const zoneCode = document.getElementById('codeExemple');
const boutonsLangage = document.querySelectorAll('.onglets button');
let indexActuel = 0;
let minuterie;

function afficherExemple(index) {
    indexActuel = index;
    zoneCode.classList.add('cache');
    setTimeout(() => {
        zoneCode.textContent = exemples[index];
        zoneCode.classList.remove('cache');
    }, 300);
    boutonsLangage.forEach((bouton, i) => bouton.classList.toggle('choisi', i === index));
}

function demarrerDefilement() {
    minuterie = setInterval(() => {
        afficherExemple((indexActuel + 1) % exemples.length);
    }, 3500);
}

boutonsLangage.forEach((bouton, i) => {
    bouton.addEventListener('click', () => {
        clearInterval(minuterie);
        afficherExemple(i);
        demarrerDefilement();
    });
});

if (zoneCode) {
    zoneCode.textContent = exemples[0];
    demarrerDefilement();
}
const boutonsFiltre = document.querySelectorAll('.filtres button');
const projets = document.querySelectorAll('.projet');

boutonsFiltre.forEach((bouton) => {
    bouton.addEventListener('click', () => {
        boutonsFiltre.forEach((b) => b.classList.remove('choisi'));
        bouton.classList.add('choisi');

        const filtre = bouton.dataset.filtre;

        projets.forEach((projet) => {
            projet.hidden = !(filtre === 'tous' || projet.dataset.categorie === filtre);
        });
    });
});
const alerteEnvoi = document.getElementById('alerteEnvoi');

if (alerteEnvoi) {
    const statut = new URLSearchParams(window.location.search).get('envoi');

    if (statut === 'succes') {
        alerteEnvoi.textContent = 'Merci ! Votre message a bien été envoyé.';
        alerteEnvoi.classList.add('alerte-succes');
        alerteEnvoi.hidden = false;
    } else if (statut === 'erreur') {
        alerteEnvoi.textContent = "Oups, le message n'a pas pu être envoyé. Vérifiez les champs et réessayez.";
        alerteEnvoi.classList.add('alerte-erreur');
        alerteEnvoi.hidden = false;
    }
}