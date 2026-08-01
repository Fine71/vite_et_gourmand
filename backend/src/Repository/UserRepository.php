<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<User>
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    //Aucune concaténation de la valeur saisie par l'utilisateur :
    //Doctrine génère une requête préparée avec un paramètre lié

    public function findByEmail(string $email): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.email = :email')
            ->setParameter('email', $email)
            ->getQuery()
            ->getOneOrNullResult();
    }


    //    /**
    //     * @return User[] Returns an array of User objects
    //     */
    public function findByLastName(string $lastName): array
        {
            return $this->createQueryBuilder('u')
               ->andWhere('u.lastName LIKE :lastName')
               ->setParameter('lastName', '%'.$lastName.'%')
               ->orderBy('u.id', 'ASC')
               ->setMaxResults(10)
               ->getQuery()
               ->getResult()
           ;
       }

    public function findByFirstName(string $firstName): array
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.firstName LIKE :firstName')
            ->setParameter('firstName', '%'.$firstName.'%')
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    

    //    public function findOneBySomeField($value): ?User
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}

