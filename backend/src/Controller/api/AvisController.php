<?php

namespace App\Controller;

use App\Document\Avis;
use App\Entity\User;
use App\Repository\AvisRepository;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/avis')]
class AvisController extends AbstractController
{
    #[Route('/{restaurantId}', methods: ['GET'])]
    public function index(int $restaurantId, AvisRepository $repository): JsonResponse
    {
        $avis = $repository->findByRestaurant($restaurantId);

        return $this->json($avis);
    }

    #[Route('', methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function create(Request $request, DocumentManager $dm): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        /** @var User $utilisateur */
        $utilisateur = $this->getUser();
        // Grâce à #[IsGranted('ROLE_USER')], $utilisateur est garanti non-null ici :
        // Symfony renvoie automatiquement une 401/403 avant d'atteindre cette ligne
        // si la requête ne vient pas d'une session authentifiée.

        $avis = new Avis();
        $avis->setRestaurantId((int) $data['restaurantId']);
        $avis->setUserId($utilisateur->getId()); // jamais depuis $data, toujours depuis la session
        $avis->setNote((int) $data['note']);
        $avis->setCommentaire($data['commentaire']);
        $avis->setDateAvis(new \DateTime());

        $dm->persist($avis);
        $dm->flush();

        return $this->json($avis, Response::HTTP_CREATED);
    }
}