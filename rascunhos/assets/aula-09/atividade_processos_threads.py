import os
import sys
import threading
import time

# Sem argumento: permanece ativo por 45 segundos.
duracao = float(sys.argv[1]) if len(sys.argv) > 1 else 45.0

def identificar():
    nome = threading.current_thread().name
    print(f"PID={os.getpid()} | TID={threading.get_native_id()} | {nome}",
          flush=True)

def tarefa():
    identificar()
    time.sleep(duracao)

identificar()  # Thread principal
threads = [threading.Thread(target=tarefa, name=f"Trabalho-{i}")
           for i in (1, 2)]

for thread in threads:
    thread.start()

for thread in threads:
    thread.join()

print("As duas threads terminaram. O processo sera encerrado.")
