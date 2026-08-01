<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $label = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $dateOrder = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $datePrestation = null;

    #[ORM\Column(length: 255)]
    private ?string $heureLivraison = null;

    #[ORM\Column]
    private ?float $prixMenu = null;

    #[ORM\Column]
    private ?int $nbPersonne = null;

    #[ORM\Column]
    private ?float $prixLivraison = null;

    #[ORM\Column(length: 50)]
    private ?string $statut = null;

    #[ORM\Column]
    private ?bool $pretMateriel = null;

    #[ORM\Column]
    private ?bool $restitutionMateriel = null;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getDateOrder(): ?\DateTimeimmutable
    {
        return $this->dateOrder;
    }

    public function setDateOrder(\DateTimeImmutable $dateOrder): static
    {
        $this->dateOrder = $dateOrder;

        return $this;
    }

    public function getDatePrestation(): ?\DateTimeImmutable
    {
        return $this->datePrestation;
    }

    public function setDatePrestation(\DateTimeImmutable $datePrestation): static
    {
        $this->datePrestation = $datePrestation;

        return $this;
    }

    public function getHeureLivraison(): ?string
    {
        return $this->heureLivraison;
    }

    public function setHeureLivraison(string $heureLivraison): static
    {
        $this->heureLivraison = $heureLivraison;

        return $this;
    }

    public function getPrixMenu(): ?float
    {
        return $this->prixMenu;
    }

    public function setPrixMenu(float $prixMenu): static
    {
        $this->prixMenu = $prixMenu;

        return $this;
    }

    public function getNbPersonne(): ?int
    {
        return $this->nbPersonne;
    }

    public function setNbPersonne(int $nbPersonne): static
    {
        $this->nbPersonne = $nbPersonne;

        return $this;
    }

    public function getPrixLivraison(): ?float
    {
        return $this->prixLivraison;
    }

    public function setPrixLivraison(float $prixLivraison): static
    {
        $this->prixLivraison = $prixLivraison;

        return $this;
    }

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): static
    {
        $this->statut = $statut;

        return $this;
    }

    public function isPretMateriel(): ?bool
    {
        return $this->pretMateriel;
    }

    public function setPretMateriel(bool $pretMateriel): static
    {
        $this->pretMateriel = $pretMateriel;

        return $this;
    }

    public function isRestitutionMateriel(): ?bool
    {
        return $this->restitutionMateriel;
    }

    public function setRestitutionMateriel(bool $restitutionMateriel): static
    {
        $this->restitutionMateriel = $restitutionMateriel;

        return $this;
    }
}
