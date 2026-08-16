<?php

namespace App\Security;

use App\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;

class LoginSuccessHandler implements AuthenticationSuccessHandlerInterface
{
    public function onAuthenticationSuccess(Request $request, TokenInterface $token): Response
    {
        /** @var User $utilisateur */
        $utilisateur = $token->getUser();

        return new JsonResponse([
            'email' => $utilisateur->getEmail(),
            'role'  => $utilisateur->getRoles()[0] ?? 'ROLE_USER',
        ]);
    }
}