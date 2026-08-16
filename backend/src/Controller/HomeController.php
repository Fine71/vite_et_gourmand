<?php
// src/Controller/api/homeController.php

namespace App\Controller;

use App\Entity\Restaurant;
use App\Repository\RestaurantRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/home', name: 'app_home')]
class HomeController extends AbstractController
{
    #[Route('/api/home', name: 'app_home')]
    public function home(): Response
    {
        return $this->json(['message' => 'Accueil OK']);
    }
}