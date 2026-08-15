<?php

namespace App\Document;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

#[ODM\Document(collection: 'avis')]
class Avis
{
    #[ODM\Id]
    private ?string $id = null;

    #[ODM\Field(type: 'int')]
    private ?int $restaurantId;

    #[ODM\Field(type: 'int')]
    private ?int $userId;

    #[ODM\Field(type: 'int')]
    private ?int $note;

    #[ODM\Field(type: 'string', length: 255)]
    private ?string $commentaire;

    #[ODM\Field(type:'date')]
    private ?\DateTime $dateAvis;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getRestaurantId(): ?int
    {
        return $this->restaurantId;
    }

    public function setRestaurantId(int $restaurantId): static
    {
        $this->restaurantId = $restaurantId;

        return $this;
    }

    public function getUserId(): ?int
    {
        return $this->userId;
    }

    public function setUserId(int $userId): static
    {
        $this->userId = $userId;

        return $this;
    }

    public function getNote(): ?int
    {
        return $this->note;
    }

    public function setNote(int $note): static
    {
        // Sécurité applicative : la note doit rester dans une plage cohérente
        if ($note < 1 || $note > 5) {
            throw new \InvalidArgumentException('La note doit être comprise entre 1 et 5.');
        }
        
        $this->note = $note;

        return $this;
    }

    public function getCommentaire(): ?string
    {
        return $this->commentaire;
    }

    public function setCommentaire(string $commentaire): static
    {
        $this->commentaire = $commentaire;

        return $this;
    }

    public function getDateAvis(): ?\DateTime
    {
        return $this->dateAvis;
    }

    public function setDateAvis(\DateTime $dateAvis): static
    {
        $this->dateAvis = $dateAvis;

        return $this;
    }
}
