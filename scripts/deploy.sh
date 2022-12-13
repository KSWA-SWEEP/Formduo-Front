# 가동중인 awsstudy 도커 중단 및 삭제
sudo docker ps -a -q --filter "name=frontend-msa" | grep -q . && docker stop frontend-msa && docker rm frontend-msa | true

# 기존 이미지 삭제
sudo docker rmi qkdrmsgh73/service-search

# 도커허브 이미지 pull
sudo docker pull qkdrmsgh73/service-search

# 도커 run
sudo docker run -d -p 3000:3000 --name service-search qkdrmsgh73/service-search

# 사용하지 않는 불필요한 이미지 삭제 -> 현재 컨테이너가 물고 있는 이미지는 삭제되지 않습니다.
sudo docker rmi -f $(docker images -f "dangling=true" -q) || true