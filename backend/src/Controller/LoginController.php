<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;

class LoginController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(): void
    {
        // Cette méthode n'est jamais réellement exécutée : le firewall
        // (json_login) intercepte la requête POST /api/login avant qu'elle
        // n'atteigne le contrôleur, et délègue la réponse aux handlers
        // LoginSuccessHandler / LoginFailureHandler ci-dessus.
        throw new \LogicException('Cette méthode ne devrait jamais être appelée directement.');
    }
}