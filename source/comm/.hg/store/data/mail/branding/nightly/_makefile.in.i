        �  �        ��������1��A�3I�� 0`���|��            (�/�`� Ƹ�&�6"��:�ib�RФ�Yw��A��/0Z*Afc|I��� � � ����4�2m2+���B�P��p��yԦ>��]Y'�����:���O�C��։�J��3���
�D�Q[	��tǏ�6��x�3_�|�O�&�Q��;�����;a���Q���T)�>m&*���M�	�Y��x�*.��#8��f�3���G�nt�7���R)7��W�-�d�� WP#����i���Ly0���)d���5	��N��{�rz,�� ø����b�w�v{��<j��K��c_ʍ��>�g���T�Cc���904����12,(00�E�T����P[��V{��8ΗM�Z�`���B��z$�:�KjJ���V�N	��(u��K%�:^_u�8��y"1��J�S�S&�i3w�;�Ӹp'����Z�/?q�R��C�ނx*�;����N�ػ$�*juJ�B}8H����%L�@lؗjAq�^\�=�%����O.Ϯ�|�f�#�}X�LS�F  �u��Dk �'��;�]e"�� 7�F�9x\=��ȕ����*�t�S`l" Z����m��\-�?�}v2E�S�O>��ǳ7�ƈ]N� ��ã�����~u�����)]E�B6:�?Nߵq���u�գ6�q��i�Y�3���aDH���@�  �a��`�=�I�� H:J���F�&��;�M�+~'�	�8U�R��J�ܮ��-��aK���kKio�a ��f?�w�����!�A&C5p`*z������K �D����m:����h����N�/@*R�}%�Vh�O��UN�.��]�2�GJ�d��!},$X|I6jh��N&DE�<&&�f�a�B��C���6�N'���o�L����u�,drBb�z6M��T�X���!eI�H��э��4:9��"�98��M��+O����-s	�Ip�K� &�e��;�\=žH��1$!y=�Z5��/ij�$-.����_    �     �  �       	    �����9711�s9�Zc��C��%���              �     6# Branding Makefile for nightlies/unofficial branding
  �  �   6PREF_JS_EXPORTS += $(srcdir)/thunderbird-branding.js

    o    x  �      �   ������٣phϭ����nL�t�            (�/�`u ��;-p�m ��������R2�����S����Za1��eF�ɢ4�{�il2 - / �s <)r�kM9����;)^���cZC���aD	r$�1[,��, �@���<�a�	ަ��?�V�V�Cz}�M��:�;�ٹ�!ȁ����ʚrz/:O�HLPh8�HC���F�Yg��j���)�4O9��~3��+�r�͖,�H���e)�����J�
�\5�/l�=]�:����5cL[�66 ��	�:B@�t���p �����; ��>W��[-h��v 0 Sɰ�}^�(��f]d�t�mQwtG�}��Ăb�A� �|�#O`�*+Dp5�f���!P2<͘�    �     �  �      �   ����)@Ç�|7���b ��W��phf            (�/�`� u R
'*�����n9����$��Q [�"���(L>�4 c@�4��[�9ս�{Q�6T�K����=(� �E�3�\֙0B�aJ��Έ�u�ϊy���Ӱˈ�)}c"i�y\�����=��f��'_m�>y���V�5+�\ȝlgl�-����@� ���<v6�f�8�K0��H�Ѻ�rD1�@#$����4�ypY    �       \     k   ������jۚ�&�xs��]Tq �'��              
w  
�        �     �  W     
�   ����b'?��Eh�$������cJIU            (�/�`�  �  
�  �  o	cp $(srcdir)/mailicon16.png  $(DIST)/branding/default
224324825
  0  �     Ce  �,A� "�0 D5� �9 ` D�b�T    V     n  �     �   ����$� �G�{s�R$�XAX�|              V  V   bifeq ($(OS_ARCH),OS2)
	cp $(srcdir)/thunderbird-os2.ico   $(DIST)/branding/thunderbird.ico
endif

    �       �     �   ���������3[a�xxx��^�!              P  �        �     /  p     �   ������7�����vUq�6D�              	W  	�   #ifeq (cocoa,$(MOZ_WIDGET_TOOLKIT))
    �     &  v     D   �����H�Ӷ�Z�)�q�x�uX-�P              �  �   # the Mozilla Foundation.
    %     �  �   	  (N   	������Ubщ� LcO�GUvg            (�/� �U �K&%�'3�&�Mɦ/���?��+@�����8r�$	�7��J	�H��HpQ� �����ퟪ^�����N�#k��Ɨ�6���wV�'�c�ՙ��R%���ir�`�VT��Ӆ]0{n`�����,V䳾�+�\6��`\����#���9 GF�UU�m�    �       �   
  *�   
�����o�+��V��<� ��%Eڷ               �     DEPTH = @DEPTH@
    �       q     /   ����vp�?�b�T�ّIxSk�              q  �        	        �     =�   ���������4$V�`e�4�:ݛ                o      	  q        	             D   ������?j|�{��{�چ��:�)�               �  �        	$     !  �     F�   ����K�/y������6��]|Ϯ�              �  �   ifdef MOZ_WIDGET_GTK
    	E     :       J�   ����x!��`��(zaV����D              �  �   .ifneq (,$(filter gtk%,$(MOZ_WIDGET_TOOLKIT)))
    	     4       W5   ����.[Bg�W�bѸ36Vv��bC�`               �  $   (include $(moztopsrcdir)/config/rules.mk
    	�     b  �     X   �����CMFx�B9 dZ��3�ڎ            (�/� �� �  1 {	cp $(srcdir)/mailicon64.png  $(DIST)/branding/default
128128.png
 `A�`��.5��#