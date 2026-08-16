const mailInput = document.getElementById('EmailInput');
const passwordInput = document.getElementById('PasswordInput');
const btnSignin = document.getElementById("btnSignin");

btnSignin.addEventListener('click', checkCredentials);

function checkCredentials() {
    //Ici il faudra appeler l'API pour vérifier les credentials en BDD
   
    if(mailInput.value == "test@mail.com" && passwordInput.value == "123") {
        
        //Il faudra récupérer le vrai token depuis l'API(BDD)
        const token = "lkjsdngfljsqdnglkjsdbglkjqskjgkfjgbqslkfdgbskldfgdfgsdgf"; 
        setToken(token);
        //placer ce token en cookie 

        setCookie(RoleCookieName, "admin", 7); //pour test, on place aussi un cookie role
        window.location.replace("/");
    } 
    else {
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
        }    
}

async function checkCredentials(event) {
  if (event) event.preventDefault();

  mailInput.classList.remove("is-invalid");
  passwordInput.classList.remove("is-invalid");

  try {
    const reponse = await fetch(`${API_URL}/login`, {
      method: "POST",
      credentials: "include", // indispensable : reçoit le cookie de session posé par Symfony
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: mailInput.value,
        password: passwordInput.value,
      }),
    });

    if (!reponse.ok) {
      mailInput.classList.add("is-invalid");
      passwordInput.classList.add("is-invalid");
      return;
    }

    const utilisateur = await reponse.json();

    // Le cookie de session (PHPSESSID) est posé automatiquement par le
    // navigateur grâce à credentials: "include" : inutile de gérer un
    // "token" à la main. On garde uniquement le rôle pour adapter
    // l'affichage (menus admin, etc.) — jamais comme preuve d'authentification :
    // chaque appel API sensible est revérifié côté serveur via la session (cf. 5.5).
    setCookie(RoleCookieName, utilisateur.role, 7);

    window.location.replace("/");
  } catch (erreur) {
    console.error(erreur);
    mailInput.classList.add("is-invalid");
    passwordInput.classList.add("is-invalid");
  }
}