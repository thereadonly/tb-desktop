         f   e      ’’’’’’’’­C1Ó¶
’PKļ            uFROM rust:latest

WORKDIR /usr/num_cpus

COPY . .

RUN cargo build

CMD [ "cargo", "test", "--lib" ]
