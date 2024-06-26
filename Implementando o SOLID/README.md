# GYMPASS STYLE APP.

## RFs (Requsitos funcionais)

 - [x] Deve ser possível se cadastrar.
 - [x] Deve ser possível se autenticar.
 - [x] Deve ser possível obter o perfil de um usuário logado.
 - [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado.
 - [x] Deve ser possível obter o histórico de check-ins.
 - [x] Deve ser possível buscar academias próximas (até 10Km).
 - [x] Deve ser possível buscar academias pelo nome.
 - [x] Deve ser possível realizar check-in em uma academia.
 - [x] Deve ser possível validar o check-in de um usuário.
 - [x] Deve ser possível cadastrar uma academia.

## RNs (Regras de negócio)

 - [x] O usuário não pode se cadastrar com e-mail duplicado.
 - [x] O usuário não pode fazer 2 check-ins no mesmo dia.
 - [x] O usuário não pode fazer check-in se estiver a mais de 100m da academia.
 - [x] O check-in deve ser validado dentro de 20min.
 - [x] O check-in só pode ser validado por administradores.
 - [c] A academia só pode ser cadastrada por administradores.

## RNFs (Requsitos não funcionais)

 - [x] A senha do usuário precisa estar criptografada.
 - [x] Os dados da aplicação precisam estar salvos em um banco PostgreSQL.
 - [x] Todas as listas de dados precisam estar paginadas com 20 items por página.
 - [x] O usuário deve ser identificado por um JWT.