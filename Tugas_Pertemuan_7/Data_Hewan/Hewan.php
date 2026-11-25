<?php

class Hewan
{
    private string $nama;
    private int $umur;

    public function setNama(string $nama): void
    {
        $this->nama = $nama;
    }

    public function getNama(): string
    {
        return $this->nama;
    }

    public function setUmur(int $umur): void
    {
        $this->umur = $umur;
    }

    public function getUmur(): int
    {
        return $this->umur;
    }

    public function getJenis(): string
    {
        return "Hewan";
    }
}