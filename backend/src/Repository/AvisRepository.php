<?php

namespace App\Repository;

use App\Document\Avis;
use Doctrine\Bundle\MongoDBBundle\Repository\ServiceDocumentRepository;
use Doctrine\Persistence\ManagerRegistry;

class AvisRepository extends ServiceDocumentRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Avis::class);
    }

    /**
     * Récupère les avis d'un restaurant, du plus récent au plus ancien.
     *
     * @return Avis[]
     */
    public function findByRestaurant(int $restaurantId): array
    {
        return $this->createQueryBuilder()
            ->field('restaurantId')->equals($restaurantId)
            ->sort('dateAvis', 'desc')
            ->getQuery()
            ->execute()
            ->toArray();
    }
}