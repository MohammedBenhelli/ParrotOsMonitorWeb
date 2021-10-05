import docker
import threading
import time

launchParrot = lambda: docker.from_env().containers.run('parrotsec/security', name='parrot', network='host', remove=True, stdin_open=True)

if __name__ == '__main__':
    parrotThread = threading.Thread(target=launchParrot, name='Parrot thread')
    client = docker.from_env()
    parrotThread.start()
    print("ici")
    time.sleep(1)
    parrotContainer = client.containers.get('parrot')
    print(parrotContainer.exec_run('ls'))
