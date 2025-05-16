CREATE TABLE `Rewards` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `claimed` tinyint(1) NOT NULL DEFAULT '0',
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'hearts500',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
