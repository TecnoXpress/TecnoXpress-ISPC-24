-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tecnoxpress` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `tecnoxpress` ;

-- -----------------------------------------------------
-- Table `tecnoxpress`.`usuario_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnoxpress`.`usuario_usuario` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(128) NOT NULL,
  `last_login` DATETIME(6) NULL DEFAULT NULL,
  `is_superuser` TINYINT(1) NOT NULL,
  `username` VARCHAR(150) NOT NULL,
  `first_name` VARCHAR(150) NOT NULL,
  `last_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `is_staff` TINYINT(1) NOT NULL,
  `is_active` TINYINT(1) NOT NULL,
  `date_joined` DATETIME(6) NOT NULL,
  `dni` INT NULL DEFAULT NULL,
  `fecha_de_nacimiento` DATE NULL DEFAULT NULL,
  `direccion` VARCHAR(50) NOT NULL,
  `fecha_registro` DATE NULL DEFAULT NULL,
  `nro_telefonico` VARCHAR(15) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE,
  UNIQUE INDEX `Usuario_usuario_email_1d07a5a4_uniq` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tecnoxpress`.`carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnoxpress`.`carrito` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `usuario_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `usuario_id` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `carrito_usuario_id_55385271_fk_Usuario_usuario_id`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `tecnoxpress`.`usuario_usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tecnoxpress`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnoxpress`.`categoria` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tecnoxpress`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnoxpress`.`producto` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(100) NULL DEFAULT NULL,
  `precio` INT NOT NULL,
  `stock` INT NOT NULL,
  `imagen` VARCHAR(100) NULL DEFAULT NULL,
  `categoria_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `producto_categoria_id_67131168_fk_categoria_id` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `producto_categoria_id_67131168_fk_categoria_id`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `tecnoxpress`.`categoria` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tecnoxpress`.`carrito_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnoxpress`.`carrito_productos` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `carrito_id` BIGINT NOT NULL,
  `producto_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `carrito_productos_carrito_id_producto_id_07c78474_uniq` (`carrito_id` ASC, `producto_id` ASC) VISIBLE,
  INDEX `carrito_productos_producto_id_f131b860_fk_producto_id` (`producto_id` ASC) VISIBLE,
  CONSTRAINT `carrito_productos_carrito_id_dcfc38c0_fk_carrito_id`
    FOREIGN KEY (`carrito_id`)
    REFERENCES `tecnoxpress`.`carrito` (`id`),
  CONSTRAINT `carrito_productos_producto_id_f131b860_fk_producto_id`
    FOREIGN KEY (`producto_id`)
    REFERENCES `tecnoxpress`.`producto` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tecnoxpress`.`provincia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnoxpress`.`provincia` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tecnoxpress`.`localidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnoxpress`.`localidad` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(250) NOT NULL,
  `codigo_postal` VARCHAR(50) NOT NULL,
  `provincia_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `localidad_provincia_id_438da32d_fk_provincia_id` (`provincia_id` ASC) VISIBLE,
  CONSTRAINT `localidad_provincia_id_438da32d_fk_provincia_id`
    FOREIGN KEY (`provincia_id`)
    REFERENCES `tecnoxpress`.`provincia` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tecnoxpress`.`envio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnoxpress`.`envio` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `direccion` VARCHAR(150) NOT NULL,
  `descripcion` VARCHAR(250) NULL DEFAULT NULL,
  `fecha_envio` DATETIME(6) NULL DEFAULT NULL,
  `entregado` TINYINT(1) NOT NULL,
  `carrito_id` BIGINT NOT NULL,
  `usuario_id` BIGINT NOT NULL,
  `localidad_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `carrito_id` (`carrito_id` ASC) VISIBLE,
  UNIQUE INDEX `usuario_id` (`usuario_id` ASC) VISIBLE,
  INDEX `envio_localidad_id_e8502cdc_fk_localidad_id` (`localidad_id` ASC) VISIBLE,
  CONSTRAINT `envio_carrito_id_a2aa690a_fk_carrito_id`
    FOREIGN KEY (`carrito_id`)
    REFERENCES `tecnoxpress`.`carrito` (`id`),
  CONSTRAINT `envio_localidad_id_e8502cdc_fk_localidad_id`
    FOREIGN KEY (`localidad_id`)
    REFERENCES `tecnoxpress`.`localidad` (`id`),
  CONSTRAINT `envio_usuario_id_bd388594_fk_Usuario_usuario_id`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `tecnoxpress`.`usuario_usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tecnoxpress`.`metodo_pago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnoxpress`.`metodo_pago` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `metodo` VARCHAR(150) NOT NULL,
  `description` VARCHAR(250) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tecnoxpress`.`pago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnoxpress`.`pago` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME(6) NOT NULL,
  `monto` DOUBLE NOT NULL,
  `carrito_id` BIGINT NOT NULL,
  `usuario_id` BIGINT NOT NULL,
  `metodo_pago_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `carrito_id` (`carrito_id` ASC) VISIBLE,
  INDEX `pago_usuario_id_377c5c78_fk_Usuario_usuario_id` (`usuario_id` ASC) VISIBLE,
  INDEX `pago_metodo_pago_id_a0b7dc7c_fk_metodo_pago_id` (`metodo_pago_id` ASC) VISIBLE,
  CONSTRAINT `pago_carrito_id_6287dec1_fk_carrito_id`
    FOREIGN KEY (`carrito_id`)
    REFERENCES `tecnoxpress`.`carrito` (`id`),
  CONSTRAINT `pago_metodo_pago_id_a0b7dc7c_fk_metodo_pago_id`
    FOREIGN KEY (`metodo_pago_id`)
    REFERENCES `tecnoxpress`.`metodo_pago` (`id`),
  CONSTRAINT `pago_usuario_id_377c5c78_fk_Usuario_usuario_id`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `tecnoxpress`.`usuario_usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

