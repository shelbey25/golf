CREATE TABLE `TimedInterest` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timeTagged` datetime(3) NOT NULL DEFAULT '2012-09-12 00:00:00.000',
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId2` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
