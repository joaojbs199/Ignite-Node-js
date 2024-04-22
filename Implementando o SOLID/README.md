# GYMPASS STYLE APP.

## RFs (Requsitos funcionais)

 - [x] Deve ser possível se cadastrar.
 - [ ] Deve ser possível se autenticar.
 - [ ] Deve ser possível obter o perfil de um usuário logado.
 - [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado.
 - [ ] Deve ser possível obter o histórico de check-ins.
 - [ ] Deve ser possível buscar academias próximas.
 - [ ] Deve ser possível buscar academias pelo nome.
 - [ ] Deve ser possível realizar check-in em uma academia.
 - [ ] Deve ser possível validar o check-in de um usuário.
 - [ ] Deve ser possível cadastrar uma academia.

## RNs (Regras de negócio)

 - [x] O usuário não pode se cadastrar com e-mail duplicado.
 - [ ] O usuário não pode fazer 2 check-ins no mesmo dia.
 - [ ] O usuário não pode fazer check-in se estiver a mais de 100m da academia.
 - [ ] O check-in deve ser validado dentro de 20min.
 - [ ] O check-in só pode ser validado por administradores.
 - [ ] A academia só pode ser cadastrada por administradores.

## RNFs (Requsitos não funcionais)

 - [x] A senha do usuário precisa estar criptografada.
 - [x] Os dados da aplicação precisam estar salvos em um banco PostgreSQL.
 - [ ] Todas as listas de dados precisam estar paginadas com 20 items por página.
 - [ ] O usuário deve ser identificado por um JWT.