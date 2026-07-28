<?php

// src/Controller/Api/RestaurantController.php

namespace App\Controller\Api;

use App\Entity\Restaurant;
use App\Repository\RestaurantRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;


#[Route('api/restaurant', name: 'app_api_restaurant_')]
class RestaurantController extends AbstractController
{
    public function __construct(
        private  EntityManagerInterface $manager,
        private RestaurantRepository $repository) 
    {
    }
    #[Route(methods: ['POST'])]
    public function new(): Response
    {
        $restaurant = new Restaurant();
        $restaurant->setName('Vite et Gourmand');
        $restaurant->setDescription('Un restaurant qui propose une cuisine rapide et savoureuse, idéale pour les personnes pressées qui veulent se régaler sans sacrifier la qualité.');
        $restaurant->setAddress('123 rue de la gastronomie, Bordeaux');
        $restaurant->setCreateAt(new DateTimeImmutable());

        // Enregistrer le restaurant en base de données

        // Tell Doctrine you want to (eventually) save the restaurant (no queries yet)
        $this->manager->persist($restaurant);

        // Actually executes the queries (i.e. the INSERT query)
        $this->manager->flush();

        return $this->json(
            ['message' => "Restaurant resource created with {$restaurant->getId()} id"],
            Response::HTTP_CREATED,
            );
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(int $id): Response
    {
        $restaurant = $this->repository->findOneBy(['id' => $id]);

        if (!$restaurant) {
            throw $this->createNotFoundException("No restaurant found for {id} id");
        }
        return $this->json(
            ['message' => "Restaurant was found : {$restaurant->getName()} for {$restaurant->getId()} id"]
        );
    }

    #[Route('/{id}', name: 'edit', methods: ['PUT'])]
    public function edit(int $id): Response
    {
        $restaurant = $this->repository->findOneBy(['id' => $id]);
        if (!$restaurant) {
            throw $this->createNotFoundException("No restaurant found for {id} id");
        }
        $restaurant->setName('Vite et Gourmand');
        $this->manager->flush();

        return $this->redirectToRoute('app_api_restaurant_show', ['id' => $restaurant->getId()]);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id): Response
    {
        $restaurant = $this->repository->findOneBy(['id' => $id]);
        if (!$restaurant) {
            throw $this->createNotFoundException("No restaurant found for {id} id");
        }
        $this->manager->remove($restaurant);
        $this->manager->flush();

        return $this->json(['message' => "Restaurant deleted successfully"], Response::HTTP_NO_CONTENT);
    }
}