<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Order;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactoryInterface;


class AppFixtures extends Fixture
{
    public function __construct(
        private UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setEmail('admin@restaurant.fr');
        $user->setLastName('Dupont');
        $user->setFirstName('Jean');
        $user->setRoles(['ROLE_ADMIN']);
        $user->setPassword($this->passwordHasher->hashPassword($user, 'MotDePasse123!'));
        $user->setPhone('0123456789');
        $user->setCreateAt(new \DateTimeImmutable());
        $manager->persist($user);

        $order1 = new Order();
        $order1->setUser($user);
        $order1->setLabel('Commande 1');
        $order1->setDateOrder(new \DateTimeImmutable());
        $order1->setDatePrestation(new \DateTimeImmutable('2024-06-15 12:00:00'));
        $order1->setHeureLivraison('12:00');
        $order1->setPrixMenu(25.50);
        $order1->setNbPersonne(4);
        $order1->setPrixLivraison(5.00);
        $order1->setStatut('En cours');
        $order1->setPretMateriel(true);
        $order1->setRestitutionMateriel(false);
        $manager->persist($order1);

        $order2 = new Order();
        $order2->setUser($user);
        $order2->setLabel('Commande 2');
        $order2->setDateOrder(new \DateTimeImmutable());
        $order2->setDatePrestation(new \DateTimeImmutable('2024-06-20 18:30:00'));
        $order2->setHeureLivraison('18:30');
        $order2->setPrixMenu(30.00);
        $order2->setNbPersonne(6);
        $order2->setPrixLivraison(7.50);
        $order2->setStatut('En cours');
        $order2->setPretMateriel(true);
        $order2->setRestitutionMateriel(false);
        $manager->persist($order2);
              
        $manager->flush();
    }
}
